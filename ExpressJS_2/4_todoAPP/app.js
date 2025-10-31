const express = require('express');
const app = express();
const path = require('path');

// this is todo with Client side rendering (CSR)

// When you open http://localhost:4444/ in your browser, the browser requests the path /.
// express.static checks if there is a file named index.html in the folder static.
// If it finds index.html, it serves it automatically.
// This is standard behavior: index.html is the default file for a directory in static serving.
// That’s why your HTML appears in the browser like a frontend page, even though you didn’t write app.get('/').
app.use(express.urlencoded({ extended: true })); // ye post request ke body ko read karne ke liye lagate hain
// agar get request '/' route ki hoti defined [app.get('/')] toh static files serve nahi hoti 


app.use(express.static(path.join(__dirname, 'static'))); // ye static folder ke andar jo bhi file hain unko serve karne ke liye lagate hain

let todos = [
    // {id: 1, task: 'Learn Node.js'},
    { id: 1, task: 'Cricket' },
    { id: 2, task: 'Swim' },
    { id: 3, task: 'Coding' },
    { id: 4, task: 'Dance' },
];

// Endpoint to get all todos as JSON
app.get('/todos' , (req, res) => {
    res.send(todos);
});

// Endpoint to get a specific todo by id
app.get('/todo/:id' , (req, res) => {
    const { id } = req.params;
    const data = todos.filter(todo => todo.id == +id); // id is string toh +id apne aap number me convert kar dega
    res.send(data);
});



app.get('/todo-delete/:id', (req, res) => {
    const { id } = req.params;
    todos = todos.filter(todo => todo.id != +id);
    res.send(todos);
})


// form jab submit hoga toh /todo pr bhej rha . yha woh accept krli .
// name attribute jo form ke input field me hai usi ke basis pr req.body me data aayega
// submit krte hi page reload hojaega and a url hojaega '/todo' but post request ka url kyu aaya ? 
// its bcoz browser k through request ja rhi hai . post and get dono hi request url se hi jati hai
// bs mein POST request khud url k through nahi bhej sakta ki sochu data daaldu aur bhej du thats not possible
// POST browser k through sirf form se hi jaegi
// ab jaruri hai ki POST request jane k baad bhi page reload na ho toh uske liye hum get request k url pr redirect kr denge
// bcoz agar reload kra toh same request phirse chali jayegi aur phirse same todo add hogi
// but thats not what we want . we want ki ek baar hi add ho
app.post('/todo', (req, res) => {
    const { task } = req.body;
    todos.push({ id: todos.length + 1, task }); // sirf 'task' likhne se 'task': task apne aap lelega
    // res.send(todos); // ye bhej denge toh page reload hoga aur url me /todo aa jayega aur baar baar add hota rahega data on reload
    res.redirect('/'); // redirect kr denge home page pr . ispr express.static ke through index.html serve ho jayega
    // ab static folder ki index.html , file.js , styles.css dobara run hongi 
    // aur wapas se js file run hote hi purana sab jo chla woh gayab hojayega bcoz server se dobara get request hogi '/' ke liye
    // isliye hum 'fetch' (AJAX) ka use krenge in js file 
});



app.listen(4444, () => {
    console.log('http://localhost:4444');
});
/*
--> app.listen(port, callback) :
This starts your server and makes it listen for incoming HTTP requests on the specified port.
Meaning:
Your Node.js app is now waiting for requests (like GET, POST) on port like 4444.
The callback runs once server successfully starts.

--> app.get(path, handler) :
Defines a route handler for HTTP GET requests at the given path.
Meaning:
When the browser or client sends a GET request to /todos, this function runs.
It typically fetches and sends data (like your todo list) back to the client.

--> app.post(path, handler) :
Defines a route handler for HTTP POST requests at the given path.
Meaning:
When the client submits data (like a new todo) via a POST request to /todo, this function runs.
It typically receives data, processes it (e.g., adds todo), and responds (e.g., redirect or send JSON).

--> app.use(middleware)
It registers middleware functions that run for every incoming request (or for specific routes if specified).
Middleware can:
Modify request or response objects
Execute code before route handlers
Serve static files
Handle errors, logging, parsing, etc.
*/



/*
How Everything Works Together ? 
Page load: The browser requests / (served by static index.html).
index.html loads and runs file.js.
file.js fetches /todos from the backend to get all todos and displays them inside the <ul>.
User submits the form: the form POSTs to /todo.
The backend adds the new todo to the array.
The backend redirects the browser to /.
The browser reloads the page.
The JS in file.js runs again, fetching all todos including the new one and displaying them.
 */



/*
What happens to your todo data when nodemon restarts?
Your todos are stored in a variable like this:
let todos = [];
This variable exists only in the server’s memory while the server is running.
When nodemon restarts your server, the whole program starts fresh — so this variable is set back to an empty array [].
That means all your todos disappear because they were only stored in memory.
*/



