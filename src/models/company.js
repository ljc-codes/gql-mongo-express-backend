const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const companySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  exchange : {
    type: String,
    required: true
  },
  ticker : {
    type: String,
    required: true
  },
  division : {
    type: String,
    required: true
  },
  majorgroup : {
    type: String,
    required: true
  },
  industry : {
    type: String,
    required: true
  },
  sic_name: {
    type: String,
    required: true
  },
  creator: {
      type: Schema.Types.ObjectId,
      ref: 'User'
  },
  filed: {
    type: String,
    required: true
  },
  adsh: {
    type: String,
    required: true
  },
  cik: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  sic: {
    type: String,
    required: true
  },
  countryba: {
    type: String,
    required: true
  },
  stprba: {
    type: String,
    required: true
  },
  cityba: {
    type: String,
    required: true
  },
  zipba: {
    type: String,
    required: true
  },
  bas1: {
    type: String,
    required: true
  },
  bas2: {
    type: String,
    required: true
  },
  countryma: {
    type: String,
    required: true
  },
  stprma: {
    type: String,
    required: true
  },
  cityma: {
    type: String,
    required: true
  },
  zipma: {
    type: String,
    required: true
  },
  mas1: {
    type: String,
    required: true
  },
  countryinc: {
    type: String,
    required: true
  },
  stprinc: {
    type: String,
    required: true
  },
  ein: {
    type: String,
    required: true
  },
  former: {
    type: String,
    required: true
  },
  changed: {
    type: String,
    required: true
  },
  afs : {
    type: String,
    required: true
  },
  wksi : {
    type: String,
    required: true
  },
  fye : {
    type: String,
    required: true
  },
  form : {
    type: String,
    required: true
  },
  period : {
    type: String,
    required: true
  },
  fy : {
    type: String,
    required: true
  },
  fp : {
    type: String,
    required: true
  },
  accepted : {
    type: String,
    required: true
  },
  prevrpt : {
    type: String,
    required: true
  },
  detail : {
    type: String,
    required: true
  },
  instance : {
    type: String,
    required: true
  },
  nciks : {
    type: String,
    required: true
  },
  aciks : {
    type: String,
    required: true
  },
  yr : {
    type: String,
    required: true
  },
  fik : {
    type: String,
    required: true
  },
  quarter : {
    type: String,
    required: true
  },
  wikipedia : {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Company', companySchema);
