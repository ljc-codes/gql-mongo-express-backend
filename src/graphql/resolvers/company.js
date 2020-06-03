const Company = require('../../models/company');
const User    = require('../../models/user');

const { transformCompany } = require('./merge');

module.exports = {
  companies: async () => {
    try {
      const companies = await Company.find();
      return companies.map(company => {
        console.log('[mongo]   gql/query/companies...' + company.name)
        return transformCompany(company);
      });
    } catch (err) {
      throw err;
    }
  },
  createCompany: async (args, req) => {
    /*if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }*/
    console.log('[mongo]   gql/mutation/createCompany...')
    const company = new Company({
      title: args.CompanyInput.title,
      description: args.CompanyInput.description,
      price: +args.CompanyInput.price,
      date: new Date(args.CompanyInput.date),
      exchange: args.CompanyInput.exchange,
      ticker: args.CompanyInput.ticker,
      division: args.CompanyInput.division,
      majorgroup: args.CompanyInput.majorgroup,
      industry: args.CompanyInput.industry,
      sic_name: args.CompanyInput.sic_name,
      creator: req.userId,
      filed: args.CompanyInput.filed,
      adsh: args.CompanyInput.adsh,
      cik: args.CompanyInput.cik,
      name: args.CompanyInput.name,
      sic: args.CompanyInput.sic,
      countryba: args.CompanyInput.countryba,
      stprba : args.CompanyInput.stprba,
      cityba : args.CompanyInput.cityba,
      zipba: args.CompanyInput.zipba,
      bas1 : args.CompanyInput.bas1,
      bas2 : args.CompanyInput.bas2,
      baph : args.CompanyInput.baph,
      countryma: args.CompanyInput.countryma,
      stprma: args.CompanyInput.stprma,
      cityma: args.CompanyInput.cityma,
      zipma: args.CompanyInput.zipma,
      mas1: args.CompanyInput.mas1,
      countryinc: args.CompanyInput.countryinc,
      stprinc: args.CompanyInput.stprinc,
      ein: args.CompanyInput.ein,
      former: args.CompanyInput.former,
      changed: args.CompanyInput.changed,
      afs: args.CompanyInput.afs,
      wksi: args.CompanyInput.wksi,
      fye: args.CompanyInput.fye,
      form: args.CompanyInput.form,
      period: args.CompanyInput.period,
      fy: args.CompanyInput.fy,
      fp: args.CompanyInput.fp,
      accepted: args.CompanyInput.accepted,
      prevrpt: args.CompanyInput.prevrpt,
      detail: args.CompanyInput.detail,
      instance: args.CompanyInput.instance,
      nciks: args.CompanyInput.nciks,
      aciks: args.CompanyInput.aciks,
      yr: args.CompanyInput.yr,
      fik: args.CompanyInput.fik,
      quarter: args.CompanyInput.quarter,
      wikipedia: args.CompanyInput.wikipedia
    });
    let createdCompany;
    try {
      const result = await company.save();
      createdCompany = transformCompany(result);
      const creator = await User.findById(req.userId);

      if (!creator) {
        throw new Error('User not found.');
      }
      creator.createdCompanies.push(company);
      await creator.save();

      return createdCompany;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  company: async (args,req) => {
    try {
      const company = await Company.findOne({ 'cik': args.cik })
      console.log('[mongo]   gql/query/company...' + company.name)
      return transformCompany(company);
    } catch (err) {
      throw err;
    }
  },
  searchCompanies : async (args,req) => {
    // destrcture search, page, limit, and set default values
    const { terms = null, page = 1, limit = 20 } = args;

    let searchQuery = {};

    // run if search is provided
    if (terms) {
      // update the search query
      searchQuery = {
        $or: [
          { title: { $regex: terms, $options: 'i' } },
          { exchange: { $regex: terms, $options: 'i' } },
          { ticker: { $regex: terms, $options: 'i' } },
          { division: { $regex: terms, $options: 'i' } },
          { majorgroup: { $regex: terms, $options: 'i' } },
          { industry: { $regex: terms, $options: 'i' } },
          { sic_name: { $regex: terms, $options: 'i' } },
          { cik: { $regex: terms, $options: 'i' } },
          { name: { $regex: terms, $options: 'i' } },
          { sic: { $regex: terms, $options: 'i' } },
          { countryba: { $regex: terms, $options: 'i' } },
          { stprba: { $regex: terms, $options: 'i' } },
          { cityba: { $regex: terms, $options: 'i' } },
          { zipba: { $regex: terms, $options: 'i' } },
        ]
      };
    }
    // execute query to search users
    const companies = await Company.find(searchQuery)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();
    return companies
  }
};
