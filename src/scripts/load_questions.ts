import { Client } from 'pg';
import fs from 'fs';

// We will load questions here

/*
 * 1: (Re)Charger le schema de BDD
 * 2: parser le CSV (ou ODT/XLS) voir https://www.npmjs.com/package/csv-parser
 * 3: INSERT
*/


const client = new Client({ connectionString: 'postgres://ephiscience:password@localhost/wisdom_journey' })

    ; (async () => {
        await client.connect()

        await client.query(`
            DROP TABLE IF EXISTS questions;
            CREATE TABLE questions (
                id SERIAL PRIMARY KEY,
                description VARCHAR(1000) -- French text
            )
        `)

        let a: number = 42;

        await client.query(`INSERT INTO questions (description) VALUES ('Ma première question')`)

        const res = await client.query('SELECT * FROM questions as message')

        console.log("Les questions en BDD sont: ")

        res.rows.forEach(r => console.log(r.description))

        // console.log(res.rows[0].description) // Hello world!

        await client.end()
    })()
