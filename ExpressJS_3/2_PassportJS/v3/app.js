const path = require('path');
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = 4444;
require('dotenv').config()

const passport = require('./passport/passport');
const isLoggedIn = require('./middlewares/isLoggedIn');
const isLoggedOut = require('./middlewares/isLoggedOut');
const session = require('express-session');

var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
    uri: 'mongodb://127.0.0.1:27017/myapp',
    collection: 'mySessions'
});

app.use(session({
    secret: 'abdfrv jhrjewrjwerje',
    resave: true,
    saveUninitialized: true,
    store: store,
}));


app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));

// Way to user routers
app.get('/login', (req, res) => {
    res.redirect('/auth/login');
})
app.use('/auth', isLoggedOut, require('./routers/auth'));
app.use('/', isLoggedIn, require('./routers/user'));

app.post('/logout', function (req, res, next) {
    req.logout(function (error) {
        if (error) {
            return res.render('error', {
                error
            })
        }
        res.redirect('/auth/login');
    });
});


mongoose.connect('mongodb://localhost:27017/myapp')
    .then(() => {
        app.listen(PORT, () => {
            console.log(`http://localhost:` + PORT);
        });
    })

/*
Ye code ek Express.js app hai jo Passport.js aur MongoDB-backed session store ke saath user authentication implement karta hai.

1. Setup: Express app create hota hai, dotenv load hoti hai for environment variables, aur MongoDB session store configure hota 
hai using connect-mongodb-session.
2. Session: express-session configure hota hai with secret aur MongoDB store, jisse user sessions database me save hote 
hain for persistence.
3. Passport: Passport initialize hota hai aur session ke saath integrate hota hai for login management.
4. View engine aur form parsing: Handlebars (hbs) set hota hai aur URL-encoded form data parse hota hai.
5. Routers:
   - '/login' route simple redirect karta hai login page pe.
   - '/auth' route authentication-related routes handle karta hai, sirf logged-out users ke liye.
   - '/' route user-specific pages serve karta hai, sirf logged-in users ke liye.
6. Logout: req.logout() se user ka session destroy hota hai aur login page pe redirect hota hai.
7. MongoDB connection: MongoDB connect hota hai aur server start hota hai port 4444 pe.

Basically, ye code ek **robust session-based authentication system** implement karta hai with login, 
signup, logout, route protection, aur session persistence in database.

*/