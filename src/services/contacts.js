import { Contact } from '../db/models/contact.js';

function createContact(contact) {
  return Contact.create(contact);
}

export { createContact };
