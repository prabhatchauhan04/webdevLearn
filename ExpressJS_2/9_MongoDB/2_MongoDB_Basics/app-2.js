const path = require('path');
const express = require('express');
const app = express();
const PORT = 4444;
const { MongoClient } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

app.use(express.urlencoded({ extended: true }));
let dbName = 'testDB';
let db;

app.get('/students', async (req, res) => {
    const students = db.collection('students'); // Agar 'students' naam ka collection hai toh use krega, else create krega
    const data = await students.find({}).toArray();
    res.send(data);
})

app.post('/student', async (req, res) => {
    const { name, age, city } = req.body;
    console.log(name, age, city);
    const students = db.collection('students');
    const newStudent = await students.insertOne({
        name,
        age: +age,
        city
    })

    res.send(newStudent);
})


/*
This PUT request updates the city for all students of a certain age.
Example:
Request body: { "age": 20, "city": "Delhi" }
All students aged 20 will have their city changed to "Delhi"
Then the user is redirected to /students to see the changes.
*/
app.put('/students', async (req, res) => {
    const { age, city } = req.body;
    const students = db.collection('students');
    await students.updateMany(
        {age: +age},
        {
            $set: {
                city
            }
        }
    )
    res.redirect('/students');
})

client.connect()
    .then(() => {
        db = client.db(dbName);
        app.listen(PORT, () => {
            console.log(`http://localhost:` + PORT);
        });
    })
