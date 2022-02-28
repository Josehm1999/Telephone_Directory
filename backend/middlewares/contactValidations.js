import contact from '../models/contact.model.js';
import directory from '../models/directory.model.js';

const isFieldNameEmpty = async (req, res, next) => {
  const { name } = req.params;

  return !name ? res.status(400).send({ message: 'Data incomplete' }) : next();
};

const isPhoneNumberValid = async (req, res, next) => {
  const { landline, cellphone } = req.body;

  const regex = new RegExp(`^[2-9][0-9]{6,8}$`);

  return !regex.test(landline) || !regex.test(cellphone)
    ? res.status(400).send({ message: 'Cellphone or Landline invalid' })
    : next();
};
const existingContact = async (req, res, next) => {
  const existingContactDB = await contact.findOne({
    name: req.body.name,
    directory: req.body.directoryId,
  });
  return existingContactDB
    ? res.status(400).send({ message: 'This contact is already registered' })
    : next();
};

const existsPhoneNumber = async (req, res, next) => {
  const existingPhoneDB = await contact.findOne({
    cellphone: req.body.cellphone,
    directory: req.body.directoryId,
  });
  return existingPhoneDB
    ? res
        .status(400)
        .send({ message: 'This cellphone number is already registered' })
    : next();
};

const isDirectoryFull = async (req, res, next) => {
  const { directoryId } = req.body;
  if (!directoryId) res.status(400).send({ message: 'Incomplete Data' });
  const directoryDB = await directory.findById(directoryId);

  directoryDB.limit === directoryDB.contacts.length
    ? res
        .status(400)
        .send({ message: 'The directory is already at full capacity.' })
    : next();
};

export {
  existingContact,
  isDirectoryFull,
  isFieldNameEmpty,
  isPhoneNumberValid,
  existsPhoneNumber,
};
