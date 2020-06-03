const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  username: {
    type : String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdCompanies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Company'
    }
  ],
  createdTheses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thesis'
    }
  ],
  likedCompanies: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Company'
    }
  ],
  rank: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required:false
  },
  specialization: {
    type: String,
    required: false
  },
  organization: {
    type: String,
    required: false
  },
  feedSettings: {
    type: String,
    required : false
  }
});

module.exports = mongoose.model('User', userSchema);
