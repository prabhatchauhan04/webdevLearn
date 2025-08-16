const express = require('express'); // this will also work : ' import express from 'express'; '
const app = express(); // this creates an instance of express

// app.get is used to handle GET requests
// the first argument is the path, the second is a callback function
// the callback function has two arguments: req (request) and res (response)
// when a GET request is made to the path '/', the server will respond with 'Hello World!'
// you can change the path to any path you want
// request ka type is GET, so we use app.get
// you can also use app.post, app.put, app.delete for other request types
app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

// query parameters are used here to send data in the URL
app.get('/greet', (req, res) => {
    // browser pr search krenge aur yha wale console pr vscode mein bcoz yehi server hai toh yha log hoga
    console.log(req.query); // this will log the query parameters in the URL
    // for example, if the URL is /greet?name=John, this will log { name: 'John' }
    // you can access the query parameters using req.query
    // you can also use req.params to access the route parameters
    // for example, if the URL is /greet/John, you can access John using req.params.name
    res.send(`Greetings from ${req.query.name || "express"}!`);
});

// route parameters / params are used here to send data in the URL
app.get('/movie/:name', (req, res) => {
    const { name } = req.params; // this will get the name from the URL
    res.send(`Movie name is ${name}`);
});


// 4444 is the port number
// you can change it to any port number you want
app.listen(4444);



