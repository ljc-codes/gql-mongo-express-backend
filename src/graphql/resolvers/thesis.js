const Company = require('../../models/company');
const Thesis  = require('../../models/thesis');
const { transformCompany, transformThesis } = require('./merge');

module.exports = {
  theses: async (args, req) => {
    /*if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }*/
    try {
      console.log('[mongo]   gql/query/theses...')
      const theses = await Thesis.find({user: req.userId});
      return theses.map(thesis => {
        return transformThesis(thesis);
      });
    } catch (err) {
      throw err;
    }
  },
  thesis: async (args,req) => {
    try {
      const thesis = await Thesis.findOne({ _id : args.thesisId })
      console.log('[mongo]   gql/query/thesis...' + thesis.title)
      return transformThesis(thesis);
    } catch (err) {
      throw err;
    }
  },
  createThesis: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    console.log('[mongo]   gql/mutation/createThesis...')
    const fetchedCompany = await Company.findOne({ _id: args.ThesisInput.companyId });
    const thesis = new Thesis({
      user: req.userId,
      company: fetchedCompany,
      content: args.ThesisInput.content
    });
    const result = await thesis.save();
    return transformThesis(result);
  },
  deleteThesis: async (args, req) => {
    if (!req.isAuth) {
      throw new Error('Unauthenticated!');
    }
    try {
      console.log('[mongo]   gql/mutation/deleteThesis...')
      const thesis = await Thesis.findById(args.ThesisInput.thesisId).populate('company');
      const company = transformCompany(thesis.company);
      await Thesis.deleteOne({ _id: args.thesisId });
      return company;
    } catch (err) {
      throw err;
    }
  },
  searchTheses: async(args, req) => {
    // destrcture search, page, limit, and set default values
    const { terms = null, page = 1, limit = 20 } = args;

    let searchQuery = {};

    // run if search is provided
    if (terms) {
      // update the search query
      searchQuery = {
        $or: [
          { name:  { $regex: terms, $options: 'i' } },
          { email: { $regex: terms, $options: 'i' } }
        ]
      };
    }

    // execute query to search users
    const theses = await Thesis.find(searchQuery)
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    // get total documents
    
    return theses
  }
}
