const express = require('express');
const app = express();
const { v4: uuid } = require('uuid');
const PORT = 4444;
const path = require('path');
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));


// todo with Server Side Rendering (SSR)


let todos = [
    {
        id: 1,
        task: "Buy groceries",
        description: "Pick up milk, eggs, bread, and vegetables from the store."
    },
    {
        id: 2,
        task: "Finish project report",
        description: "Complete the final draft of the project report and email it to the manager."
    },
    {
        id: 3,
        task: "Call the plumber",
        description: "Schedule an appointment to fix the leaking kitchen sink."
    },
    {
        id: 4,
        task: "Workout",
        description: "Do a 30-minute cardio session and some light stretching."
    },
    {
        id: 5,
        task: "Read a book",
        description: "Read at least 20 pages of the new novel before bed."
    }
];

app.get('/', (req, res) => {
    res.render('index', { todos });
})

app.get('/todos/:id', (req, res) => {
    const { id } = req.params;
    const data = todos.filter(todo => todo.id == +id);
    res.render('index', {
        todos: data
    })
})

app.get('/delete-todo/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id != +id);
    res.redirect('/');
})

app.post('/todos', (req, res) => {
    const { task, description } = req.body;
    todos.push({
        id: uuid(),
        task,
        description
    })
    console.log(todos);
    res.redirect('/');
})


app.listen(PORT, () => {
    console.log('http://localhost:' + PORT);
})

/*
SSR Todo App – Quick Notes : 

app.set('view engine','hbs') → use Handlebars templates
todos[] → in-memory array of todo objects (id, task, description)

Routes:
GET / → render all todos
GET /todos/:id → render single todo
POST /todos → add todo, redirect /
GET /delete-todo/:id → delete todo, redirect /

res.render(view, data) → server builds HTML and sends to browser (SSR)

Browser just displays HTML; no JS needed for initial page
*/

/*
HANDLEBARS- hbs
While using serving static file, the data is send to the browser in the chunky manner (i.e. little data is send according to the 
need) with the help of app.use(express.static()) middleware, but it is not efficient to write backend code

Hence , we use SERVER SIDE RENDERING - sending the whole file at once with the help of handlebars

It helps to throw the index file at once and it is used as .hbs file as with this, HTML file is just not only made on backend but we 
can use javascript variables as well in the file

For this , install hbs :--
> npm install hbs

WE can access .hbs in js file with the help of res.render , it is a response where client gets index.hbs file.

res.render('index')

In order to use handlebars in our javascript file, we need to set it by :--
> app.set('view engine','hbs')
*/