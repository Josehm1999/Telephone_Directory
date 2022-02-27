import express from 'express';

import {
  listContacts,
  createDirectory,
  freeSpaces,
} from '../controllers/directory.controller.js';
import validId from '../middlewares/validId.js';
const router = express.Router();

router.get('/:_id', [validId], listContacts);
router.post('/createDirectory', createDirectory);
router.get('/freeSpaces/:_id', [validId], freeSpaces);
export default router;
