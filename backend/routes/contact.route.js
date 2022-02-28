import express from 'express';

import {
  createContact,
  deleteContact,
  isRegistered,
  searchContact,
} from '../controllers/contact.controller.js';
import {
  existingContact,
  existsPhoneNumber,
  isDirectoryFull,
  isFieldNameEmpty,
  isPhoneNumberValid,
} from '../middlewares/contactValidations.js';
import validId from '../middlewares/validId.js';
const router = express.Router();

/*
 * @_id: Id of directory
 * @name: name of contact
 * */
router.get(
  '/searchContact/:_id/:name',
  [validId, isFieldNameEmpty],
  searchContact
);

/*
 * @_id: Id of directory
 * @name: name of contact
 * */
router.get(
  '/isRegistered/:_id/:name',
  [validId, isFieldNameEmpty],
  isRegistered
);

router.post(
  '/createContact',
  [existingContact, isDirectoryFull, isPhoneNumberValid, existsPhoneNumber],
  createContact
);

/*
 * @_id: Id of directory
 * @name: name of contact
 * */
router.delete('/delete/:_id/:name', [validId, existingContact], deleteContact);
export default router;
