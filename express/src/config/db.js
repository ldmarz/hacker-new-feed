const mongoose = require('mongoose');
require('dotenv').config();

const HOSTNAME = process.env.HOSTNAME || 'localhost';
const PORT = process.env.DBPORT || '27017';
const DATABASE = process.env.DATABASE || 'test';

mongoose.connect(`mongodb://${HOSTNAME}:${PORT}/${DATABASE}`, {useNewUrlParser: true});

module.exports = mongoose;
