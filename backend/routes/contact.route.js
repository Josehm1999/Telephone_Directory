import express from 'express';

import {
  createContact,
  deleteContact,
  isRegistered,
  searchContact,
} from '../controllers/contact.controller.js';
import {
  existingContact,
  isDirectoryFull,
  isFieldNameEmpty,
  isPhoneNumberValid,
} from '../middlewares/contactValidations.js';
import validId from '../middlewares/validId.js';
const router = express.Router();

router.get('/searchContact/:name', [isFieldNameEmpty], searchContact);
router.get('/isRegistered/:name', [isFieldNameEmpty], isRegistered);
router.post(
  '/createContact',
  [existingContact, isDirectoryFull, isPhoneNumberValid],
  createContact
);

router.delete('/delete/:_id', [validId, existingContact], deleteContact);
export default router;
