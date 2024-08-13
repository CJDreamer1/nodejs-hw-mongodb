import express from 'express';

import {
  getAllContacts,
  getContactById,
  createContact,
  patchContactWithAvatar,
  deleteContact,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { contactSchema } from '../validation/contacts.js';
import { auth } from '../middlewares/authenticate.js';

import { upload } from '../middlewares/upload.js';

const router = express.Router();

router.get('/contacts', auth, ctrlWrapper(getAllContacts));
router.get('/contacts/:id', auth, isValidId, ctrlWrapper(getContactById));

router.post(
  '/contacts',
  auth,
  upload.single('photo'), // Додаємо middleware для завантаження файлів
  validateBody(contactSchema),
  ctrlWrapper(createContact),
);

router.patch(
  '/contacts/:id',
  auth,
  isValidId,
  upload.single('photo'),
  validateBody(contactSchema),
  ctrlWrapper(patchContactWithAvatar),
);

router.delete('/contacts/:id', auth, isValidId, ctrlWrapper(deleteContact));

export default router;
