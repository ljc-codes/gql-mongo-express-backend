# 🦩 graphql-mongo-expressjs-api
## Overview
### version: BETA


## What is it?

**graphql-mongo-expressjs-api** is example code for standing up a graphql endpoint on an express server with nodemon. 

The app leverages mongoose to build data models and interacts to a mongo atlas cluster. Middleware in the form of jsonwebtoken is provided for authentication. 

The starter models included in the code demonstrate basic usages for building web apps. 

## Configuration 

In the **nodemon.json** file we find the following configuration for the server. 

    {
        "env": {
            "MONGO_URI": "mongodb+srv://[YOUR MONGOATLAS CLUSTER URI]",
            "GQL_ENDPOINT": "/graphql",
            "PORT": 4000
        }
    }

## Build Steps 

    npm install
    npm start 
    
    
