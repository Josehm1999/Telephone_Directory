import mongoose from 'mongoose';

const directorySchema = new mongoose.Schema({
  contacts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'contacts',
    },
  ],
  limit: { type: Number, default: 10 },
  registerDate: { type: Date, default: Date.now },
});

const directory = mongoose.model('directories', directorySchema);
export default directory;
