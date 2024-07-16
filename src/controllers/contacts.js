import { Contact } from '../db/models/contact.js';

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error!',
    });
  }
};
