const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const cors = require('cors');
const authController = require('./controllers/auth.controller');
const propertyController = require('./controllers/property.controller');
const uploadController = require('./controllers/upload.controller');

const app = express();

mongoose.connect(process.env.DB_URL);
app.use('/images', express.static('public/images'))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/auth', authController);
app.use('/property', propertyController);
app.use('/upload', uploadController);

app.listen(process.env.PORT, () => console.log('Server successfully started'));
