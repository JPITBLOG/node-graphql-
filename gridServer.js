`use strict`;

//library declaration
const express = require("express");
const cors = require("cors");
const express_graphql = require("express-graphql");
const {buildSchema} = require("graphql");
const {apolloUploadExpress} = require("apollo-upload-server");

const {upsertStudentDetail, uploadFile} = require("./services/studentService");


//schema declaration
let schema = buildSchema(`
    type Query {
        allStudents: [Students]
    }
    
    input Upload{
        name: String!
        type: String!
        size: Int!
        path: String!
    }
    
    type Mutation {
        upsert(id: Int, input: StudentObj): AddStudentResponse
        uploadFile(file: Upload!): Boolean!
    }
    
    input StudentObj {
        firstName: String!
        lastName: String!
        imagefile: Upload!
    }
    
    type Students {
        firstName: String
        lastName: String
        image: String
    }
    
    type AddStudentResponse {
        message: String
        students: Students
    }
`);

const getAllStudents = () => {
    return ([
        {firstName: 'jigar', lastName: 'patel', image: 'image1'},
        {firstName: 'jay', lastName: 'Bhagivala', image: 'image2'},
        {firstName: 'jonty', lastName: 'patel', image: 'image3'}
    ]);
}

//Root resolver
let root = {
    allStudents: getAllStudents,
    upsert: upsertStudentDetail,
    uploadFile: uploadFile
}

//app config
let app = express();
app.use(cors());
app.use(`/graphql`,
    apolloUploadExpress({uploadDir: "./upload"}),
    express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => {
   console.log(`graphql is ready for use on port 4000`);
});


