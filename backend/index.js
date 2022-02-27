import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import db from './db/db.js';
import directoryRoute from './routes/directory.route.js';
import contactRoute from './routes/contact.route.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;
app.use(express.json());
app.use(cors());
app.use('/api/directory/', directoryRoute);
app.use('/api/contact/', contactRoute);

app.listen(port, () => {
  db.dbConnection();
  console.log(`App running on port: ${port}`);
});
