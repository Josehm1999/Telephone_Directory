import Response from 'express';
import mongoose from 'mongoose';

const validId = async (req, res = Response, next) => {
  const { _id } = req.params;
  if (!_id) return res.status(400).send({ message: 'Invalid id' });

  const isIdValid = mongoose.Types.ObjectId.isValid(_id);
  if (isIdValid) {
    if (String(new mongoose.Types.ObjectId(_id)) === _id) return next();
    return res.status(400).send({ message: 'Invalid id' });
  }
  return res.status(400).send({ message: 'Invalid id' });
};

export default validId;
