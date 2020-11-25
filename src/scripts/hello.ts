
//Server with TypeGraphQL

import "reflect-metadata";
import { createConnection } from "typeorm";
import { buildSchema } from "type-graphql";
import { ApolloServer } from "apollo-server";
import { QuestionResolver } from "../resolvers/QuestionResolver"; 

async function main(){
  const connection = await createConnection()
  const schema = await buildSchema({
    resolvers: [QuestionResolver] 
  })
  const server = new ApolloServer({ schema })
  await server.listen(4000)
  console.log("Server has started!")
}
main();

/*

//Server with Experss

import {createConnection, Connection} from "typeorm";
import {Questions} from "../entity/questions";

const express = require('express');
const app = express();
const port = 3000;


createConnection().then(connection => {
    const userRepository = connection.getRepository(Questions);

    app.get('/', (req, res) => {
       res.send('Hello World !')
    });

    app.get('/api/questions', async(req, res) => {
        const questions = await userRepository.find()
        res.send(questions)
    });

    app.get('/api/questions/:id', async(req, res) => {
        const results = await userRepository.findOne(req.params.id);
        return res.send(results);
    });  


    app.listen(port, () => {
        console.log(`Example app listening on port ${port} !`)
    });

});
*/