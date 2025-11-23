const path = require('path'); // Node.js module to work with file paths
const express = require('express'); // Express framework for server and routing
const Users = require('./model/Users'); // Import Users model for MongoDB
const { default: mongoose } = require('mongoose'); // Mongoose library for MongoDB
const app = express(); // Create Express app
const PORT = 4444; // Define port for server
const passport = require('passport'); // Passport.js library for authentication
const LocalStrategy = require('passport-local'); // LocalStrategy for username/password authentication
/*
LocalStrategy is one strategy of authentication: it checks username + password from your database.
Passport has many other strategies (JWT, Google OAuth, Facebook, etc.), but here we’re using LocalStrategy.
*/


/*
express-session creates server-side sessions. Each logged-in user gets a session stored on the server.
passport.initialize() sets up Passport to work in your app.
passport.session() tells Passport to use sessions to remember logged-in users.
*/
/*
Same as this bs chote mein likh diya :
const session= require('express-session');
app.use(session({
    secret: 'notknownbytheuser', //for id generation, secret is required
    resave: false, //do not change the data
    saveUninitialized: true  //irrespective of requirement evryone will get a session ID
}))
*/
// this adds req.session to every request object
app.use(require('express-session')({ secret: 'abdfrv jhrjewrjwerje', resave: true, saveUninitialized: true })); 
// Setup express-session for handling sessions

/*
const { initialize } = require('passport');
app.use(initialize());
*/
/*
passport.initialize() sets up Passport to work in your app.
passport.session() tells Passport to use sessions to remember logged-in users.
*/
// middleware to initialize passport and use passport sessions on every request
app.use(passport.initialize()); // Initialize Passport middleware
app.use(passport.session()); // Enable persistent login sessions
/*  
this passport.session() middleware is what integrates Passport with express-session.
its internal working is like this :
if (req.session.passport && req.session.passport.user) {
    // call the function you registered in deserializeUser jo passport.deserializeUser() mein pass kiya tha 
    // req.session.passport.user contains the user ID stored in session by serializeUser
    yourFunction(req.session.passport.user, function(err, user) {
        req.user = user;
    });
} else {
    // passport.user doesn't exist
    req.user = null;  // nothing to attach
}
*/

/*
LocalStrategy takes a verify function with (username, password, callback) 
Users.findOne({ username }) searches the DB for the user.
If user doesn’t exist, callback returns false.
If password doesn’t match, callback returns false.
If both are correct, callback returns the user object.
Passport then stores this user info in the session.
cb: Passport uses the “error-first callback” pattern. First param 
is error (if any), second is success/failure user object, third is optional message.
*/
// 'username' in the argument is the name of the field in the login form (basically req.body.username)
// 'password' is the name of the password field in the login form (req.body.password)
// The 'cb' is the callback function provided by Passport to signal success/failure of authentication
// dhyan dena ki ye passport pr 'use' krke strategy define kr rha hai na ki 'app' pr . so its not a middleware but rather
// a strategy  which passport will use whenever authentication is required. So basically it is a configuration of passport .
// we can use multiple strategies with passport for different types of authentication (google, facebook, jwt , local etc)
passport.use(new LocalStrategy(async function verify(username, password, cb) { 
    try {
        let existingUser = await Users.findOne({ username }); // Find user by username
        if (!existingUser) {
            // Error nhi tha user ne username galat daal diya, that means error ki jagah null,
            // user nhi milla toh uski jagah false
            return cb(null, false, { message: 'Incorrect username' }); // Handle wrong username
        }

        if (existingUser.password != password) {
            return cb(null, false, { message: 'Incorrect password' }); // Handle wrong password
        }

        return cb(null, existingUser); // Successful authentication
    } catch (error) {
        // error first callbacks
        cb(error); // Handle errors
    }
}));


/*
Called once at login.
Decides what to store in the session. Here, we store only user._id (not the whole object).
This keeps session data small and safe.
*/
// 'user' is the authenticated user object from the verify function/strategy above
// 'user' will be same as 'existingUser' in the verify function when authentication is successful
/*
What happens in the session store?
If you are using default in-memory session or something like connect-mongodb-session, your session looks like:
{
  "sessionId1": {
    "cookie": { "maxAge": 60000, "expires": "...", ... },
    "passport": { "user": "64fae2b4e3f1c5a1f0a12345" }  // User A's ID stored by serializeUser
  },
  "sessionId2": {
    "cookie": { "maxAge": 60000, "expires": "...", ... },
    "passport": { "user": "64fae2b4e3f1c5a1f0a67890" }  // User B's ID
  }
}
Notice that only the user ID is stored, not the full user object.
*/
// if after verify function , authentication is successful , passport will call this function to decide what to store in session
passport.serializeUser(function (user, done) {
    // this function 'done' is provided by passport and is same as the 'cb' function in verify function 
    done(null, user._id); // Save user ID to session store like req.session.passport.user = user._id
});

// serializeUser → runs once when user logs in successfully, to store something in the session (usually user._id).
// deserializeUser → runs on every request after that, to turn that ID back into the full user object (req.user).
// called on every request by passport.session() middleware
// When a request comes in with a session cookie, Passport calls deserializeUser with the user ID from the session.
// decides how to get the full user object back from what’s in the session, on every request.
// 'id' is the user ID stored in the session by serializeUser
// 'done' is the callback function to signal completion
// argument 'id' is same as 'user._id' which we stored in serializeUser function above
passport.deserializeUser(async function (id, done) {
    try {
        let user = await Users.findOne({ _id: id }); // Find user by ID from session
        // console.log("Deserialize",user)
        // 'user' will be attached to 'req.user' for use in routes
        // so basically after this function executes , we can access the user object in any route via req.user
        done(null, user); // Return user object
    } catch (error) {
        done(error); // Handle errors
    }
});

app.set('view engine', 'hbs'); // Set view engine to Handlebars
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded form data

app.get('/signup', isLoggedOut, (req, res) => {
    res.render('signup'); // Render signup page
})

function isLoggedIn(req, res, next) {
    if (req.user) {
        return next(); // If logged in, continue
    }
    res.redirect('/login'); // Otherwise redirect to login
}

function isLoggedOut(req, res, next) {
    if (!req.user) {
        return next(); // If logged out, continue
    }
    res.redirect('/'); // Otherwise redirect to home
}

app.post('/signup', isLoggedOut, async (req, res, next) => {
    const { username, password, email } = req.body; // Extract form data
    try {
        await Users.insertOne({
            username,
            password,
            email: email || '' // Default empty string if no email
        })
        res.redirect('/login'); // Redirect to login after signup
    } catch (error) {
        res.render('error', { error }); // Render error page if signup fails
    }
})

app.get('/login', isLoggedOut, (req, res, next) => {
    res.render('login'); // Render login page
})

// Use Passport's authenticate middleware for login 
// It uses the LocalStrategy defined above
// 'local' means we are using LocalStrategy for authentication 
app.post('/login', passport.authenticate('local', {
    successRedirect: '/', // Redirect to home on successful login
    failureRedirect: '/login' // Redirect back to login on failure
}))

app.get('/', isLoggedIn, (req, res) => {
    console.log(req.user); // Log current user
    res.render('profile', { user: req.user }); // Render profile page
})

app.post('/logout', function (req, res, next) {
    /*
        req.logout() is a Passport.js function that logs the user out by removing the user property from the session.
        It effectively ends the user’s authenticated session.
        It does the following internally:
        if (req.session && req.session.passport) {
            delete req.session.passport.user; // removes stored user id
        }
        req.user = null; // removes req.user

    */
    req.logout(function (error) {
        if (error) {
            return res.render('error', { error }); // Render error page if logout fails
        }
        res.redirect('/login'); // Redirect to login after logout
    });
});

mongoose.connect('mongodb://localhost:27017/myapp') // Connect to MongoDB
    .then(() => {
        app.listen(PORT, () => {
            console.log(`http://localhost:` + PORT); // Start server
        });
    })

/*
Ye code ek Express.js app hai jo user authentication ke liye Passport.js use karta hai.

1. Signup: User apna username, password aur email deke register karta hai aur data MongoDB me save hota hai.
2. Login: User username/password dalta hai, Passport.js check karta hai aur agar sahi ho to session start hota hai.
3. Session management: serializeUser aur deserializeUser se user ki info session me store aur retrieve hoti hai, jisse har request
me req.user available hota hai.
4. Route protection: isLoggedIn aur isLoggedOut middleware se pages ko protect kiya gaya hai.
5. Logout: req.logout() se session destroy hota hai aur user login page pe redirect hota hai.

Basically, ye code ek basic login/signup system with session-based authentication implement karta hai using Passport.js.
____________________________________________________________________________________________________________________________________

Ah! Got it — you want an **exact line-by-line style comparison**: what you have to write **without Passport** vs **with Passport**. I’ll break it down so it sticks in your mind.

---

## **1. Login check (username/password)**

### **Without Passport**

```js
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    let user = await Users.findOne({ username });
    if (!user) return res.redirect('/login');
    if (user.password !== password) return res.redirect('/login');

    // Manually create session
    req.session.userId = user._id;

    res.redirect('/');
});
```

### **With Passport**

```js
app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));
```

**Difference:**

* Without Passport → You manually check DB + manually set session.
* With Passport → Strategy handles DB check and session management automatically.

---

## **2. Storing user info in session**

### **Without Passport**

```js
// after login success
req.session.userId = user._id;
```

* You have to manually attach user ID to the session.

### **With Passport**

```js
passport.serializeUser(function(user, done) {
    done(null, user._id);
});
```

* Passport automatically stores the user ID in session via `serializeUser`.

---

## **3. Retrieving user info on every request**

### **Without Passport**

```js
app.get('/', async (req, res) => {
    if (!req.session.userId) return res.redirect('/login');
    let user = await Users.findOne({ _id: req.session.userId });
    res.render('profile', { user });
});
```

* You manually check `req.session.userId` and fetch user from DB.

### **With Passport**

```js
passport.deserializeUser(async function(id, done) {
    let user = await Users.findOne({ _id: id });
    done(null, user);
});

app.get('/', isLoggedIn, (req, res) => {
    res.render('profile', { user: req.user });
});
```

* Passport automatically runs `deserializeUser` for each request.
* `req.user` is ready to use; no manual DB fetch in route.

---

## **4. Route protection (is logged in / out)**

### **Without Passport**

```js
function isLoggedIn(req, res, next) {
    if (req.session.userId) return next();
    res.redirect('/login');
}
```

### **With Passport**

```js
function isLoggedIn(req, res, next) {
    if (req.user) return next();
    res.redirect('/login');
}
```

**Difference:**

* Without Passport → check session manually.
* With Passport → `req.user` automatically populated.

---

## **5. Logout**

### **Without Passport**

```js
app.post('/logout', (req, res) => {
    req.session.destroy(); // manually destroy session
    res.redirect('/login');
});
```

### **With Passport**

```js
app.post('/logout', (req, res) => {
    req.logout(function(err) {
        if (err) return res.render('error', { error: err });
        res.redirect('/login');
    });
});
```

**Difference:**

* Passport provides `req.logout()` helper to remove user from session.

---

*/
/*
Browser sends request with session cookie
      |
      v
express-session reads session
      |
      v
Passport sees session has user ID
      |
      v
Calls deserializeUser(id, done)
      |
      v
You fetch user from DB → call done(null, user)
      |
      v
Passport sets req.user = user
      |
      v
Your route handler now has access to req.user
*/
/*
User interacts with the website
    |
    v
----------- FRONTEND -----------
1. User visits /signup or /login
2. User fills out the form and submits
   - Signup form: username, password, email
   - Login form: username, password
    |
    v
----------- EXPRESS SERVER -----------
3. Express receives POST request
   - Middleware: express.urlencoded() parses form data
    |
    v
----------- ROUTE HANDLER -----------
Signup:
   - Middleware: isLoggedOut checks if user is already logged in
   - Route handler inserts new user into MongoDB
   - Redirects to /login

Login:
   - Middleware: isLoggedOut
   - Route handler calls passport.authenticate('local')
    |
    v
----------- PASSPORT LOCAL STRATEGY -----------
4. LocalStrategy verify function runs:
   - Receives username & password from req.body
   - Checks MongoDB for user
       - If user not found → cb(null, false, { message })
       - If password wrong → cb(null, false, { message })
       - If valid → cb(null, user)
    |
    v
5. Passport receives successful user from LocalStrategy
   - Calls serializeUser(user, done)
    |
    v
----------- SERIALIZE USER -----------
6. serializeUser stores only user._id in session
   - Session is stored in memory or MongoDB session store
    |
    v
----------- SESSION STORED & COOKIE SENT -----------
7. Express-session sends session cookie to browser
   - Browser stores cookie
    |
    v
----------- FUTURE REQUESTS -----------
8. Browser makes requests to protected routes (like '/')
   - Middleware: passport.session() reads session from cookie
   - Calls deserializeUser(id, done)
       - Fetches full user object from MongoDB
       - Attaches user object to req.user
    |
    v
----------- ROUTE HANDLER -----------
9. Protected route handler (like '/') executes
   - Middleware: isLoggedIn ensures user is authenticated
   - req.user contains full user object
   - Route renders profile page with user data
    |
    v
----------- LOGOUT -----------
10. User clicks logout
    - Route calls req.logout()
    - Passport destroys session
    - Browser redirected to /login

*/