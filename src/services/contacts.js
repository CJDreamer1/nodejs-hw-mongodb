import { Contact } from '../db/models/contact.js';

async function getContacts({
  page,
  perPage,
  sortBy,
  sortOrder,
  isFavourite,
  userId,
}) {
  const limit = perPage;
  const skip = page > 0 ? (page - 1) * perPage : 0;

  const filter = { userId };

  if (typeof isFavourite !== 'undefined') {
    filter.isFavourite = isFavourite;
  }

  const contactQuery = Contact.find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limit);

  const [contacts, count] = await Promise.all([
    contactQuery.exec(),
    Contact.countDocuments(filter),
  ]);

  const totalPages = Math.ceil(count / perPage);
  return {
    contacts,
    page,
    perPage,
    totalItems: count,
    hasNextPage: totalPages - page > 0,
    hasPreviousPage: page > 1,
  };
}

function getContactById(contactId, userId) {
  return Contact.findOne({ _id: contactId, userId });
}

function createContact(contact) {
  return Contact.create(contact);
}

function deleteContact(contactId, userId) {
  return Contact.findOneAndDelete({ _id: contactId, userId });
}

function updateContact(contactId, contact, userId) {
  return Contact.findOneAndUpdate({ _id: contactId, userId }, contact, {
    new: true,
  });
}

export {
  getContacts,
  getContactById,
  createContact,
  deleteContact,
  updateContact,
};
