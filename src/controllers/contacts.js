import { createContact } from '../services/contacts.js';
import { Contact } from '../db/models/contact.js';

export const getAllContacts = async (req, res, next) => {
  const contacts = await Contact.find();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await Contact.findById(contactId);
  if (!contact) {
    return res.status(404).json({ message: 'Contact not found' });
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContact = async (req, res, next) => {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  const createdContact = await Contact.createContact(contact);
  res.status(201).send({
    status: 201,
    message: 'Successfully created a contact!',
    data: createdContact,
  });
};
