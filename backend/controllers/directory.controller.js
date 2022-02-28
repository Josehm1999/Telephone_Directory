import Response from 'express';
import directory from '../models/directory.model.js';

const createDirectory = async (req, res = Response) => {
  const { limit } = req.body;
  let newDirectory = new directory({
    limit,
  });
  let savedDirectory = await newDirectory.save();
  res.json({ savedDirectory });
};

const listContacts = async (req, res = Response) => {
  const { _id } = req.params;
  const { contacts } = await directory.findById(_id).populate('contacts');

  if (!contacts || contacts.length === 0)
    return res
      .status(500)
      .send({ message: 'You haven´t registered any numbers yet' });
  return res.status(200).json({ contacts });
};

const freeSpaces = async (req, res = Response) => {
  const { _id } = req.params;
  try {
    const directoryDB = await directory.findById(_id);
    let freeSpacesLeft = directoryDB.limit - directoryDB.contacts.length;
    return res.status(200).json({ freeSpacesLeft });
  } catch (error) {
    res
      .status(500)
      .send({ message: 'Not able to calculate free spaces in directory' });
  }
};

export { createDirectory, listContacts, freeSpaces };
