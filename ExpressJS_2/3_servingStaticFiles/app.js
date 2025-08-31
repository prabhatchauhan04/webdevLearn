const express = require('express');
const app = express();
const path = require('path');

// middleware to serve static files
// ismein humne path nhi diya hai kyuki by default ye current directory mein static folder dhundta hai
// agar hum chahte ki koi aur folder ho jisme static files ho to hum path de sakte hai
// app.use(express.static(path.join(__dirname, 'public'))); // public is folder name jisme humari static files hai like html, css, js, images etc
// pura ka pura static folder hi serve kar dega ye middleware
app.use(express.static('static')); // static is folder name jisme humari static files hai like html, css, js, images etc
// hum app.use('/' , express.static('static')); bhi kar sakte hai but by default '/' hi hota hai

// ye nhi chalegi ab 
// jo path pehle mil jaega wahi response bhej dega
// isliye sirf upar wala hi chalega
app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(4444, () => {
    console.log('http://localhost:4444');
});









