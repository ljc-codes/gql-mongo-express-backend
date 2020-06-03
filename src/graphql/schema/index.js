const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Thesis {
    _id: ID!
    title: String!
    summary: String!
    footnotes: String!
    company: Company!
    user: User!
    content: String!
    createdAt: String!
    updatedAt: String!
    positionAt: String!
    depositionAt: String!
}

type Company {
  _id: ID!
  title: String!
  description: String!
  price: Float!
  date: String!
  exchange: String!
  ticker: String!
  division: String!
  majorgroup: String!
  industry: String!
  sic_name: String!
  creator: User!
  filed: String!
  adsh: String!
  cik: String!
  name: String!
  sic: String!
  countryba: String!
  stprba : String!
  cityba : String
  zipba: String!
  bas1 : String!
  bas2 : String!
  baph : String!
  countryma: String!
  stprma: String!
  cityma: String!
  zipma: String!
  mas1: String!
  countryinc: String!
  stprinc: String!
  ein: String!
  former: String!
  changed: String!
  afs: String!
  wksi: String!
  fye: String!
  form: String!
  period: String!
  fy: String!
  fp: String!
  accepted: String!
  prevrpt: String!
  detail: String!
  instance: String!
  nciks: String!
  aciks: String!
  yr: String!
  fik: String!
  quarter: String!
  wikipedia: String!
}

type User {
  _id: ID!
  email: String!
  username: String!
  password: String
  createdCompanies: [Company!]
  createdTheses: [Thesis!]
  likedCompanies: [Company!]
  rank : String!
  title: String!
  specialization: String! 
  organization: String!
  feedSettings: String!
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input CompanyInput {
  title: String!
  description: String!
  price: Float!
  date: String!
  exchange: String!
  ticker: String!
  division: String!
  majorgroup: String!
  industry: String!
  sic_name: String!
  filed: String!
  adsh: String!
  cik: String!
  name: String!
  sic: String!
  countryba: String!
  stprba : String!
  cityba : String
  zipba: String!
  bas1 : String!
  bas2 : String!
  baph : String!
  countryma: String!
  stprma: String!
  cityma: String!
  zipma: String!
  mas1: String!
  countryinc: String!
  stprinc: String!
  ein: String!
  former: String!
  changed: String!
  afs: String!
  wksi: String!
  fye: String!
  form: String!
  period: String!
  fy: String!
  fp: String!
  accepted: String!
  prevrpt: String!
  detail: String!
  instance: String!
  nciks: String!
  aciks: String!
  yr: String!
  fik: String!
  quarter: String!
  wikipedia: String!
  
}

input UserInput {
  email: String!
  username: String!
  password: String!
}

input ThesisInput {
  companyId: ID!
  title: String!
  content: String! 
  summary: String!
  footnotes: String!
}

type RootQuery {
    company(cik: String!) : Company  
    companies: [Company!]!
    thesis(thesisId: ID!): Thesis!
    theses: [Thesis!]!
    user(email: String!): User
    users: [User!]!
    login(email: String!, password: String!): AuthData!
    searchCompanies(terms: String!,lim : Int, page : Int) : [Company]
    searchUsers(terms: String!,lim : Int, page : Int)     : [User] 
    searchTheses(terms: String!,lim : Int, page : Int)    : [Thesis]
}

type RootMutation {
    createCompany(CompanyInput: CompanyInput): Company
    createUser(userInput: UserInput): User
    createThesis(ThesisInput: ThesisInput): Thesis!
    deleteThesis(thesisId: ID!): Thesis!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
