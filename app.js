const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');

const graphQlSchema = require('./src/graphql/schema/index');
const graphQlResolvers = require('./src/graphql/resolvers/index');
const isAuth = require('./src/middleware/is-auth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  `${process.env.GQL_ENDPOINT}`,
  graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

mongoose
  .connect(`${process.env.MONGO_URI}`,{useNewUrlParser:true,useUnifiedTopology: true})
  .then(() => {
    app.listen(`${process.env.PORT}`);
    console.log('[ mongo ] mongatlas db connected...');
    console.log('[graphql] graphql server started on localhost port: ' 
    + `${process.env.PORT}`.toString() + " ...");
    console.log('[graphql] iql interfaced on endpoint:  ' 
    + `${process.env.GQL_ENDPOINT}`.toString() + " ...");
  })
  .catch(err => {
    console.log(err);
  });

