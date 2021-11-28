const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
const { Schema } = mongoose;

const userSchema = new Schema({
  firstName: { type: String },
  age: { type: Number },
  companyName: { type: String }
})

module.exports = mongoose.model('users', userSchema)
