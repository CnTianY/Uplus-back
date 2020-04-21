'use strict';

module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const USERSchema = new Schema({

    name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true, unique: true },

  });

  return mongoose.model('User', USERSchema, 'T_USER');

};
