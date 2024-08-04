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
import { contactSchema } from '../validation/contacts.js';
import { auth } from '../middlewares/authenticate.js';

const router = express.Router();
const jsonParser = express.json();

router.get('/contacts', auth, ctrlWrapper(getAllContacts));
router.get('/contacts/:id', auth, isValidId, ctrlWrapper(getContactById));

router.post(
  '/contacts',
  auth,
  jsonParser,
  validateBody(contactSchema),
  ctrlWrapper(createContact),
);

router.patch(
  '/contacts/:id',
  auth,
  isValidId,
  jsonParser,
  ctrlWrapper(patchContact),
);

router.delete('/contacts/:id', auth, isValidId, ctrlWrapper(deleteContact));

export default router;
