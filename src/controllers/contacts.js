import * as ContactService from '../services/contacts.js';
import createHttpError from 'http-errors';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseIsFavouriteParams } from '../utils/parseIsFavouriteParams.js';

async function getAllContacts(req, res, next) {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const { isFavourite } = parseIsFavouriteParams(req.query);

  try {
    const contacts = await ContactService.getContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
      isFavourite,
      userId: req.user._id,
    });

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
}

async function getContactById(req, res, next) {
  const { id } = req.params;
  try {
    const contact = await ContactService.getContactById(id, req.user._id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${id}!`,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
}

async function createContact(req, res, next) {
  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
    userId: req.user._id,
  };

  try {
    const createdContact = await ContactService.createContact(contact);
    res.status(201).send({
      status: 201,
      message: 'Successfully created a contact!',
      data: createdContact,
    });
  } catch (error) {
    next(error);
  }
}

async function patchContact(req, res, next) {
  const { id } = req.params;

  const contact = {
    name: req.body.name,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
    isFavourite: req.body.isFavourite,
    contactType: req.body.contactType,
  };

  try {
    const result = await ContactService.updateContact(
      id,
      contact,
      req.user._id,
    );

    if (result === null) {
      return next(createHttpError(404, 'Contact not found'));
    }
    res.status(200).send({
      status: 200,
      message: 'Successfully patched a contact!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteContact(req, res, next) {
  const { id } = req.params;
  try {
    const result = await ContactService.deleteContact(id, req.user._id);
    if (result === null) {
      return next(createHttpError(404, 'Contact not found'));
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export {
  getAllContacts,
  getContactById,
  createContact,
  patchContact,
  deleteContact,
};
