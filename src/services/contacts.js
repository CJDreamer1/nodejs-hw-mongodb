import { Contact } from '../db/models/contact.js';

async function getContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  type,
  isFavourite,
}) {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const filter = {};
  if (typeof isFavourite !== 'undefined') {
    filter.isFavourite = isFavourite;
  }

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

function getContactById(studentId) {
  return Contact.findById(studentId);
}

function createContact(contact) {
  return Contact.create(contact);
}

function patchContact(studentId, contact) {
  return Contact.findByIdAndUpdate(studentId, contact, { new: true });
}

function deleteContact(studentId) {
  return Contact.findByIdAndDelete(studentId);
}

export {
  getContacts,
  getContactById,
  createContact,
  patchContact,
  deleteContact,
};
