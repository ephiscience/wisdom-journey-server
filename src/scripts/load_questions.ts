import { Client } from 'pg';
import fs from 'fs';
import "reflect-metadata";
import {createConnection, Connection} from "typeorm";
import {Questions} from "./entity/schema";


// We will load questions here

/*
 * 1: (Re)Charger le schema de BDD - DONE
 * 2: parser le CSV (ou ODT/XLS) voir https://www.npmjs.com/package/csv-parser - DONE
 * 3: INSERT - DONE
 * 4: TypeORM
 * 5: express pour un serveur web => essayer un Hello World + GET /api/questions + GET /api/questions/:id
 * 6: Graphql, express-graphql (https://blog.logrocket.com/how-build-graphql-api-typegraphql-typeorm/)
 * 
*/



const csv = require('csv-parser')
const results : string[] = [];

//const text = 'INSERT INTO questions (description) VALUES ($1)'

fs.createReadStream('/Users/camilleduquesne/Downloads/Stuff.csv') // should i put that in the async ?
          .pipe(csv())
          .on('data', (data) => results.push(data)) 
          .on('end', () => {
            //console.log(results); // see results 

});




//const client = new Client({ connectionString: 'postgres://ephiscience:password@0.0.0.0:5433/wisdom_journey' });

 (async () => {

    const connection: Connection = await createConnection()

    //remove what was there previously - TO DO 
    //const questions = await connection.manager.find(Questions)
    //await connection.manager.remove(Questions)

    // Add questions to database ??

    console.log("Inserting a new record into the student database...") 
    const question = new Questions()
    question.text = "Test Test Test Test"

    await connection.manager.save(question)
    console.log("Saved a new question")

    // Show questions in database  ??

    const questions = await connection.manager.find(Questions)
    console.log("Loaded questions: ", questions)


        
        //await client.connect()

        //await client.query(`
        //    DROP TABLE IF EXISTS questions;
        //    CREATE TABLE questions (
        //        id SERIAL PRIMARY KEY,
        //        description VARCHAR(1000) -- French text
        //    )
        //`)

        //let a: number = 42; 

        //await client.query(`COPY questions from '/Users/camilleduquesne/Downloads/Stuff.csv' DELIMITER ';' CSV HEADER`)

        //await client.query(`INSERT INTO questions (description) VALUES ('Ma première question')`)
        //await client.query(`INSERT INTO questions (description) VALUES (results)`)
        

        //for (var i = 0; i < results.length; i++) {
            //await client.query(text, Object.values(results[i]))
        //};

        //const res = await client.query('SELECT * FROM questions as message')

        //console.log("Les questions en BDD sont: ")

        //res.rows.forEach(r => console.log(r.description))

        // console.log(res.rows[0].description) // Hello world!

        //await client.end()
    })()
