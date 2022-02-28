import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Name is required'] },
  landline: { type: String, required: [true, 'Landline is required'] },
  cellphone: {
    type: String,
    required: [true, 'Cellphone is required'],
  },
  directory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'directories',
  },
  registerDate: { type: Date, default: Date.now },
});

const contact = mongoose.model('contacts', contactSchema);
export default contact;
