const express= require('express');
const app= express();
const path= require('path');
const PORT=4444;

const session= require('express-session');
app.use(session({
    secret: 'notknownbytheuser', //for id generation, secret is required
    resave: false, //do not change the data
    saveUninitialized: true  //irrespective of requirement evryone will get a session ID
}))

app.use(express.urlencoded({extended:true}));


app.get('/login',(req,res)=>{
    if(req.session.user){
        return res.redirect('/profile');
    }
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/login',(req,res)=>{
    const {username}= req.body;

    let userData={
        username,
        count:0
    }

    // setting the session- putting userData in the session
    req.session.user= userData;
    res.redirect('/profile');
})

app.get('/profile', (req,res)=>{
    if(!req.session.user){
         return res.redirect('/login');
    }

    req.session.user.count++;
    let userData= req.session.user;

    res.send(`welcome ${userData.username} with the count: ${userData.count}
        <br> <br>
        <a href='/logout'>
            <button>logout</button>
        </a>`)
})

app.get('/logout',(req,res)=>{
    req.session.destroy(function(error){
        res.redirect('/login');
    })
})


app.listen(PORT,()=>{
    console.log(`http://localhost:`+PORT);
})

/*
⭐ SESSION NOTES :--

1️⃣ What is a Session?

A session is a way for the server to remember the same user across multiple requests.

HTTP is stateless → server forgets everything after responding.
Sessions fix that.

2️⃣ How Sessions Work (Super Simple)
Step 1 — User logs in

Server stores user data in a session store.

Step 2 — Server gives the browser a cookie with a session ID

Example cookie:

sessionID=abc123

Step 3 — Browser sends this cookie on every request

Server uses the ID to find the saved session data.

3️⃣ Where is the session data stored?

On the server → not in the browser.

Browsers get only the session ID, nothing else.

Example (internally):

sessionStore = {
  abc123: { userId: 1, name: "John" },
  dfg678: { userId: 7, name: "Sara" }
}

4️⃣ Installing Sessions in Express
npm install express-session

5️⃣ Basic Setup
const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'mySecretKey',
  saveUninitialized: false,
  resave: false
}));

app.listen(3000);


This adds req.session to every request.

6️⃣ Creating a Session (Login Example)
app.post('/login', (req, res) => {
  // When the user logs in, save their data inside the session
  req.session.user = {
    id: 1,
    name: "John"
  };

  res.send("Logged in!");
});


What actually happens under the hood:

express-session creates abc123

stores:

sessionStore["abc123"] = { user: { id: 1, name: "John" } }


browser receives cookie:

sessionID=abc123

7️⃣ Accessing Session Data
app.get('/profile', (req, res) => {
  if (!req.session.user) return res.send("Not logged in");

  res.send("Hello " + req.session.user.name);
});


Browser sends cookie → server fetches session → attaches to req.session.

8️⃣ Destroying a Session (Logout)
app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.send("Logged out");
  });
});


This removes the entry from the session store.

9️⃣ What is Stored in Sessions?

You can store anything:

user ID

username

shopping cart

roles

temporary data

Example:

req.session.cart = ["item1", "item2"];

🔟 Why Not Store Data Directly in Cookies?

Because cookies are sent to the browser → not secure.

Sessions store sensitive data on the server, cookies store only the ID:

sessionID=abc123   ✔️ safe  
userId=1&isAdmin=true ❌ unsafe  

1️⃣1️⃣ What is secret?

The secret signs the cookie so users cannot modify the session ID.

If they try → signature mismatch → session is invalid.

1️⃣2️⃣ What is saveUninitialized?

false: don't create empty sessions

true: create a session even if we didn't put data inside it

We usually keep it false.

1️⃣3️⃣ What is resave?

false: session is not saved again if nothing changed

true: always save it

Keep it false in most apps.

1️⃣4️⃣ Where are sessions stored in production?

Memory store is only for development.

In production use:

Redis (most common)

MongoDB store

MySQL/Postgres store

File store (rare)

Redis is used because it is fast and in-memory → perfect for storing user sessions.

⭐ Super Visual Summary
Login
req.session.user = {...}  // stored on server

Server → sessionStore["abc123"] = {...}
Browser → Cookie: sessionID=abc123

Next Request

Browser sends cookie
Server finds abc123 in sessionStore
Attaches it to req.session
You access req.session.user

Logout

Destroy sessionStore["abc123"]
 */