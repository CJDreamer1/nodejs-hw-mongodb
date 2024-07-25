import express from 'express';

import {
  getAllContacts,
  getContactById,
  createContact,
  patchContact,
  deleteContact,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', ctrlWrapper(getAllContacts));
router.get('/contacts/:id', isValidId, ctrlWrapper(getContactById));

router.post('/contacts', jsonParser, ctrlWrapper(createContact));
router.patch('/contacts/:id', isValidId, jsonParser, ctrlWrapper(patchContact));
router.delete('/contacts/:id', isValidId, ctrlWrapper(deleteContact));

export default router;
