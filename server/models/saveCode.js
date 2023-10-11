const mongoose = require('mongoose');

const Schema = mongoose.Schema

const codeSchema = new Schema({
  userID: {
    type: Schema.Types.ObjectId, ref: 'User', required: true,
    } ,
  name: String,
  language: String,
  code: String,
});

const CodeModel = mongoose.model('Code', codeSchema);

module.exports = CodeModel;