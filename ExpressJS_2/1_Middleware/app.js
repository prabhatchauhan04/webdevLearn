const express = require('express');
const app = express();


/*
app.get('/' , (req , res)=>{
    res.send("Hello World"); 
});

app.get('/greet' , (req , res)=>{
    const {name} = req.query; // req.query is used to get query parameters from the URL
    res.send(`Hello ${name}`);
});

app.get('/movie/:name' , (req , res)=>{
    const {name} = req.params; // req.params is used to get route parameters from the URL
    res.send(`Movie Name is ${name}`);
});
*/

let movies = [
  {
    "id": 1,
    "name": "Inception",
    "description": "A skilled thief enters people's dreams to steal secrets and plant ideas."
  },
  {
    "id": 2,
    "name": "The Shawshank Redemption",
    "description": "Two imprisoned men bond over a number of years, finding hope and redemption."
  },
  {
    "id": 3,
    "name": "The Dark Knight",
    "description": "Batman faces the Joker, a criminal mastermind who plunges Gotham into chaos."
  },
  {
    "id": 4,
    "name": "Interstellar",
    "description": "A team of explorers travel through a wormhole in space in search of a new home for humanity."
  },
  {
    "id": 5,
    "name": "Parasite",
    "description": "A poor family schemes to infiltrate a wealthy household with unexpected consequences."
  },
  {
    "id": 6,
    "name": "The Godfather",
    "description": "The aging patriarch of an organized crime dynasty transfers control to his reluctant son."
  },
  {
    "id": 7,
    "name": "Forrest Gump",
    "description": "The life journey of Forrest Gump, a man with a low IQ but a big heart."
  },
  {
    "id": 8,
    "name": "Fight Club",
    "description": "An insomniac office worker and a soap maker form an underground fight club."
  },
  {
    "id": 9,
    "name": "Pulp Fiction",
    "description": "The lives of two mob hitmen, a boxer, and others intertwine in a series of incidents."
  },
  {
    "id": 10,
    "name": "The Matrix",
    "description": "A hacker discovers the world is a simulation and joins a rebellion to free humanity."
  }
];

// GET route on path '/movie' to get the movie details using an id
// if invalid id is provided then return "Movie not found"
app.get('/movie' , (req , res) => {
    const {id} = req.query;

    const movie = movies.filter((movie) => {
        return movie.id === parseInt(id);     
    }); // filter returns an array of all the elements that match the condition

    if(movie.length === 0){
        return res.send("Movie not found"); // agar return nhi kiya toh aage ka code bhi execute hoga aur server crash ho jayega
    }
    res.send(movie[0]); // movie is an array of one element agar mila hoga toh sirf ek hi matching movie milegi
})


// POST request

/*
app.use() is a method used to mount middleware functions in an Express application.
Middleware functions are functions that have access to the request (req), response (res), and the next middleware in the stack (next()).

> Built-in Middleware:
express.json() — Parses incoming JSON
express.urlencoded() — Parses URL-encoded form data
express.static() — Serves static files

> Custom Middleware:
You write it yourself for logging, authentication, etc.
app.use((req, res, next) => {
    req.requestTime = Date.now();
    next();
});

> Third-Party Middleware:
Installed via npm
*/

// ye har request ke liye chalega
// iske bina hum req.body ko access nhi kar paenge
/*
This middleware parses incoming request bodies with 
Content-Type: application/x-www-form-urlencoded, which is the default format used when submitting HTML forms (using method="POST").

📌 What happens if you don't use it?
req.body will be undefined in your route handler.
You won’t be able to access form data submitted via POST requests.
*/
/*
Option	Description
extended: false	Uses Node’s built-in querystring module. Parses values as strings only.
extended: true	Uses the qs library. Allows nested objects and arrays in form data.
*/
// this will run for all the incoming requests
app.use(express.urlencoded({ extended: true })); // middleware to parse urlencoded form data 

/*
request aati hai aur upar se neeche ye saara code parse krti hai aur matching route pe jaake function execute krti hai jo likha hota hai
jaise post request aayi /addmovie pe toh ye middleware chalega aur phir neeche jaake /addmovie wala function chalega 
upar se neeche request dhundhti hai uska wala code
*/

/*
Term	        Meaning
_______________________________________________________________
Middleware	    Function that runs between request and response
next()	        Moves to the next middleware or route
app.use()	    Adds middleware
Built-in	    Comes with Express (json(), urlencoded())
Third-party	    You install it (morgan, cors, etc.)
Custom	        You write it yourself
Order matters	Middleware runs in the order it’s written
*/

/*
ab dikkat ye hai ki agar server restart hua toh saari movies jo humne add ki hai woh gayab ho jayengi kyunki ye memory(ram) mein store hui hai
isko solve karne ke liye hum database use karte hain
*/
app.post('/addmovie' , (req , res) => {
    const {name , description} = req.body; // req.body is used to get the data sent in the request body
    const newMovie = {
        id: new Date().getTime(), // unique id using timestamp
        name,
        description
    };
    movies.push(newMovie);
    res.send("Movie added successfully");
});



app.listen(4444);



/*

# 1️⃣ `express.urlencoded()`

* Used for **HTML form submissions** (from `<form>` on your page).
* Handles `application/x-www-form-urlencoded` data.
* Converts form fields into `req.body` object.

**Example:**

```html
<form action="/submit" method="POST">
  <input name="username" />
  <input name="password" />
</form>
```

```js
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  console.log(req.body); // { username: 'alice', password: '1234' }
});
```

---

# 2️⃣ `express.json()`

* Used for **JSON data** sent from the frontend (AJAX, fetch, React, etc.).
* Handles `application/json` payloads.
* Converts JSON into `req.body` object.

**Example (React/JS fetch):**

```js
fetch('/submit', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ username: 'alice', password: '1234' })  // this stringifies the JS object to JSON formatted string.
});
```

```js
app.use(express.json()); // converts string back to JS object

app.post('/submit', (req, res) => {
  console.log(req.body); // { username: 'alice', password: '1234' }
});
```
// When sending data via HTTP requests (like fetch or axios):
// HTTP sends text over the network.
// You cannot directly send a JS object, because the server expects a string in JSON format.
// JSON.stringify converts your object into a string that the server can understand.
*/








