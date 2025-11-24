const express = require('express');
const path = require('path');
const app = express();

// express.json() = “Parse incoming JSON requests so I can access data in req.body.”
app.use(express.json()); // Axios ke liye middleware
app.use(express.urlencoded({extended: true})); 
app.use(express.static(path.join(__dirname, 'public')));


let todos = [];

app.get('/addtodo', (req, res) => {
    const { task, description } = req.query;
    // console.log(task, description);
    todos.push({
        name: task,
        description
    })
    // console.log(todos)

    res.send(todos);
})


app.listen(4444, () => {
    console.log('http://localhost:4444')
})