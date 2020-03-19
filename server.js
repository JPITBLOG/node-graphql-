'use strict';

const express = require("express");
const express_graphql = require("express-graphql");
let {buildSchema} = require("graphql");

//Graphql Schema

let schema = buildSchema(`
    type Query {
        message: String
    }
`);

//Root resolver
let root = {
    message: () => 'Hello jigar!'
};

//create express-server and GraphQL endpoint
let app = express();
app.use(`/graphql`, express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => {
   console.log(`graphql is ready for use on port 4000`)
});
