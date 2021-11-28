const mongoose = require('mongoose');
const { Schema } = mongoose;

const companySchema = new Schema({
  companyName: String,
  description: String,
})

module.exports = mongoose.model('company', companySchema)
