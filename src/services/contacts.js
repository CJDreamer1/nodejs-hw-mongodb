import { Contact } from '../db/models/contact.js';

function getContacts() {
  return Contact.find();
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
