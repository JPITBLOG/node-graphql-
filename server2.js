'use strict';

const express = require("express");
const cors = require("cors");
const express_graphql = require("express-graphql");
let {buildSchema} = require("graphql");

//Graphql Schema

let schema = buildSchema(`
    type Query {
        course(id: Int!): Course
        courses(title: String): [Course]
        allCourses: [Course]
    }
    
    type Mutation {
        updateCourseTopic(id: Int!, topic: String!): Course
    }
    
    type Course {
        id: Int
        title: String
        author: String
        description: String
        topic: String
        url: String
    }
`);

let getCourse = function(args) {
    let id = args.id;
    return coursesData[coursesData.findIndex(course => course.id === id)];
}

let getCourses = function(args) {

    let title = args.title;
    console.log('topic data: ', title);
    return coursesData.filter(course => {return course.title === title});
}

let getupdateCourseTopic = function({id, topic}) {
    const courseIndex = coursesData.findIndex(course => course.id === id);
    console.log('course index like: ', courseIndex);
    coursesData[courseIndex].topic = topic;
    return coursesData[courseIndex];
}

let getAllCourses = function() {
    return coursesData;
}

//Root resolver
let root = {
    course: getCourse,
    courses: getCourses,
    updateCourseTopic: getupdateCourseTopic,
    allCourses: getAllCourses
};

let coursesData = [
    {
        id: 1,
        title: "title1",
        author: "author1",
        description: "This is my description1",
        topic: "topic1",
        url: "www.url.com1"
    },
    {
        id: 2,
        title: "title2",
        author: "author2",
        description: "This is my description2",
        topic: "topic2",
        url: "www.url.com2"
    },
    {
        id: 3,
        title: "title3",
        author: "author3",
        description: "This is my description3",
        topic: "topic3",
        url: "www.url.com3"
    },
    {
        id: 4,
        title: "title4",
        author: "author4",
        description: "This is my description4",
        topic: "topic4",
        url: "www.url.com4"
    }
]

//create express-server and GraphQL endpoint
let app = express();
app.use(cors());
app.use(`/graphql`, express_graphql({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(4000, () => {
   console.log(`graphql is ready for use on port 4000`)
});
