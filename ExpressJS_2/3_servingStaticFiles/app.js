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




/*
The browser still sends separate requests for each CSS, JS, or other static file linked in your HTML.
What changes is how your server handles those requests:
Without express.static, you manually write routes to respond to each file request.
With express.static, Express automatically serves the requested files from a folder without manual routes.
*/

/*
Order of Handling Requests in Express :---
When a request comes in (e.g., for /styles.css), Express checks the middleware and routes in the order they are defined in your code.
If you have:
app.use(express.static(path.join(__dirname, 'public')));
express.static middleware tries to find and serve the file first.
If the file exists in the static folder, it serves it and the request ends there.
If the file does not exist in the static folder, express.static passes control to the next middleware or route handler.
Then Express looks for any app.get('/styles.css') or other route handlers you defined.
If you have an explicit route for /styles.css, it will handle the request there.
If not, and no other middleware handles it, Express eventually sends a 404 response.
*/




