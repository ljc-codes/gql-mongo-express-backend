const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');
const { transformUser } = require('./merge');

module.exports = {
  createUser: async args => {
    try {
      console.log('[mongo]   gql/mutation/createUser...')
      const existing_email_User = await User.findOne({ email: args.userInput.email });
      if (existing_email_User) {
        throw new Error('Email already exists!');
      }
      const existing_username_User  = await User.findOne({username : args.userInput.username })
      if (existing_username_User){
        throw new Error('Username has been taken!')
      }
      const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

      const user = new User({
        email: args.userInput.email,
        username: args.userInput.username,
        password: hashedPassword,
        rank: "unranked",
        title: "",
        specialization: "",
        organization: "",
        feedSettings: ""
      });

      const result = await user.save();

      return { ...result._doc, password: null, _id: result.id };
    } catch (err) {
      throw err;
    }
  },
  login: async ({ email, password }) => {
    console.log('[mongo]   gql/query/login...')
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error('User does not exist!');
    }
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error('Password is incorrect!');
    }
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      'pampooveylovescocaine',
      {
        expiresIn: '1h'
      }
    );
    return { userId: user.id, token: token, tokenExpiration: 1 };
  },
  users : async (args,req) => {
    try {
      const users = await User.find();
      return users.map(user => {
        console.log('[mongo]   gql/query/users...' + user.username)
        return transformUser(user);
      });
    } catch (err) {
      throw err;
    }
  },
  user: async (args, req) => {
    try {
      const user = await User.findOne({ 'email': args.email })
      console.log('[mongo]   gql/query/user...' + user.username)
      return transformUser(user);
    } catch (err) {
      throw err;
    }
  },
  searchUsers: async (args,req) => {
    // destrcture search, page, limit, and set default values
    const { terms = null, page = 1, limit = 20 } = args;

    let searchQuery = {};

    // run if search is provided
    if (terms) {
      // update the search query
      searchQuery = {
        $or: [
          { email: { $regex: terms, $options: 'i' } },
          { username: {$regex: terms ,$options :'i'} }
        ]
      };
    }

    // execute query to search users
    const users = await User.find(searchQuery)
    .limit(limit)
    .skip((page - 1) * limit)
    .lean();

    return users

  }

}
