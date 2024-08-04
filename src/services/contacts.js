import { Contact } from '../db/models/contact.js';

async function getContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  type,
  isFavourite,
  userId,
}) {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const filter = { userId };
  if (typeof isFavourite !== 'undefined') {
    filter.isFavourite = isFavourite;
  }

  // filter.userId = userId; //фільтрація за власником

  const [contacts, count] = await Promise.all([
    Contact.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit)
      .exec(),
    Contact.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(count / perPage);
  return {
    data: contacts,
    page,
    perPage,
    totalItems: count,
    hasNextPage: totalPages - page > 0,
    hasPreviousPage: page > 1,
  };
}

function getContactById(id, userId) {
  return Contact.findOne({ _id: id, userId });
}

function createContact(contact) {
  return Contact.create(contact);
}

function patchContact(id, contact) {
  return Contact.findByIdAndUpdate(id, contact, { new: true });
}

function deleteContact(id) {
  return Contact.findByIdAndDelete(id);
}

export {
  getContacts,
  getContactById,
  createContact,
  patchContact,
  deleteContact,
};
