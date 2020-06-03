const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const thesisSchema = new Schema(
  {
    company: {
      type: Schema.Types.ObjectId,
      ref: 'Company'
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    title : {
      type: String,
      required: true
    },
    footnotes: {
      type: String,
      required: true 
    },
    summary: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Thesis', thesisSchema);
