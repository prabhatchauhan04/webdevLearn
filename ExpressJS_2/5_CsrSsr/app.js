const express = require('express');
const app = express();

const PORT = 4444;

// Tell Express to use Handlebars (hbs) as the template engine
app.set('view engine', 'hbs');

// This is server-side rendering (SSR)
app.get('/', (req, res) => {
    // Render the "index.hbs" file from the "views" folder
    // Pass data to template: title and array
    // res.render() = generate + send HTML.
    res.render('index', {
        title: 'MyTodo App',       // This will replace {{title}} in template
        arr: [1, 2, 3, 4, 5, 6]   // This will be looped over in {{#each arr as |d|}}
    });
});

// Start the server and listen on PORT 4444
app.listen(PORT);



/*

"start": "nodemon app.js -e hbs,js,json"

> e stands for "extensions".
> `-e hbs,js,json`** → tells nodemon which file types to watch for changes.

---

1. You run: npm start
2. `nodemon` starts your server (`app.js`).
3. If you **edit any `.hbs`, `.js`, or `.json` file**, nodemon **automatically restarts the server**.

---

### **Important note**

* If you don’t use `-e hbs,js,json` , nodemon still works for `.js` and `.json` files (default).
* But changes in `.hbs` files won’t restart the server automatically.

---

> `nodemon app.js -e hbs,js,json` → runs server and auto-restarts when `.js`, `.hbs`, or `.json` files change.
*/

/*
hbs = Handlebars template engine for Express.
Lets you write HTML with placeholders like {{name}} or {{task}}.
Installed via npm (npm install hbs).
Server fills placeholders with data and sends dynamic HTML to the browser.

Example:
<h1>Welcome {{username}}</h1>
→ {{username}} replaced by actual value from server.
*/


/*
CSR (Client-Side Rendering) :--
The browser (your computer) builds and shows the page.
Server just sends a basic file (HTML + JS), and JS runs in the browser to make the page look like it should.
Think of it like:
You get an empty Lego base from the server, and your browser builds the Lego house using the pieces (JS) it downloaded.
Example: React, Vue SPA.

SSR (Server-Side Rendering) :--
The server (the computer hosting the website) builds the page first.
Browser gets the fully built page ready to see.
Think of it like:
The server builds the Lego house completely and sends it to you. You just see it immediately; you don’t have to build anything.
Example: Traditional websites with PHP, or Next.js in SSR mode.
*/