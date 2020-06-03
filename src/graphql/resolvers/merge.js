const DataLoader = require('dataloader');
const Company = require('../../models/company');
const User = require('../../models/user');

const { dateToString } = require('../../helpers/date');


const userLoader = new DataLoader(userIds => {
  return User.find({ _id: { $in: userIds } });
});
const companyLoader = new DataLoader(companyIds => {
  return companies(companyIds);
});

const companies = async companyIds => {
  try {
    const companies = await Company.find({ _id: { $in: companyIds } });
    companies.sort((a, b) => {
      return (
        companyIds.indexOf(a._id.toString()) - companyIds.indexOf(b._id.toString())
      );
    });
    return companies.map(company => {
      return transformCompany(company);
    });
  } catch (err) {
    throw err;
  }
};

const singleCompany = async companyId => {
  try {
    const company = await companyLoader.load(companyId.toString());
    return company;
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  try {
    const user = await userLoader.load(userId.toString());
    return {
      ...user._doc,
      _id: user.id,
      createdCompanies: () => companyLoader.loadMany(user._doc.createdCompanies),
      likedCompanies: () => companyLoader.loadMany(user._doc.likedCompanies),
      createdTheses: () => companyLoader.loadMany(user._doc.createdTheses)
    };
  } catch (err) {
    throw err;
  }
};

const transformUser = async user => {
  try {
    return {
      ...user._doc,
      _id: user.id,
      createdCompanies: () => companyLoader.loadMany(user._doc.createdCompanies),
      likedCompanies: () => companyLoader.loadMany(user._doc.likedCompanies),
      createdTheses: () => companyLoader.loadMany(user._doc.createdTheses)
    };
  } catch (err) {
    throw err;
  }
};

const transformCompany = company => {
  return {
    ...company._doc,
    _id: company.id,
    date: dateToString(company._doc.date),
    creator: user.bind(this, company.creator)
  };
};

const transformThesis = thesis => {
  return {
    ...thesis._doc,
    _id: thesis.id,
    title: thesis._doc.title,
    summary: thesis._doc.summary,
    footnotes: thesis._doc.footnotes,
    user: user.bind(this, thesis._doc.user),
    company: singleCompany.bind(this, thesis._doc.company),
    content: thesis._doc.content,
    createdAt: dateToString(thesis._doc.createdAt),
    updatedAt: dateToString(thesis._doc.updatedAt),
    positionAt: dateToString(thesis._doc.createdAt),
    depositionAt: dateToString(thesis._doc.createdAt)
  };
};

exports.transformCompany = transformCompany;
exports.transformThesis  = transformThesis;
exports.transformUser    = transformUser;

// exports.user = user;
// exports.events = events;
// exports.singleEvent = singleEvent;
