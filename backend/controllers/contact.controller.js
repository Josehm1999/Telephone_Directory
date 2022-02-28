import Response from 'express';

import contact from '../models/contact.model.js';
import directory from '../models/directory.model.js';

const createContact = async (req, res = Response) => {
  const { directoryId, name, landline, cellphone } = req.body;

  if (!directoryId || !name)
    return res.status(400).send({ message: 'Incomplete data' });

  let schema = new contact({
    name,
    landline,
    cellphone,
    directory: directoryId,
  });

  let result = await schema.save();

  if (!result) res.status(500).send({ message: 'Failed to register contact' });

  await directory.findByIdAndUpdate(directoryId, {
    $push: {
      contacts: result._id,
    },
  });
  return res.status(200).json({ contact: result });
};

const searchContact = async (req, res = Response) => {
  const { name, _id } = req.params;
  const contacts = await contact.findOne({ name, directory: _id });
  return !contacts
    ? res.status(400).json({ message: 'Contact not found' })
    : res.status(200).json({ landline: contacts.landline });
};

const isRegistered = async (req, res = Response) => {
  const { name, _id } = req.params;
  const contacts = await contact.findOne({ name, directory: _id });
  return !contacts
    ? res.status(200).json({ message: `${name} is not registered yet` })
    : res.status(400).json({ message: 'Contact is already registered' });
};

const deleteContact = async (req, res = Response) => {
  const { name, _id } = req.params;
  if (!name) return res.status(400).send({ message: 'Incomplete data' });

  try {
    const contacts = await contact.findOneAndDelete({ name, directory: _id });
    await directory.findByIdAndUpdate(_id, {
      $pull: { contacts: contacts._id },
    });
    return res.status(200).send({ message: 'Contact deleted' });
  } catch (error) {
    return res.status(500).send({ message: 'Error deleting contact' });
  }
};

export { createContact, deleteContact, searchContact, isRegistered };
