const path = require('path');
const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const PORT = 4444;
const passport = require('./passport/passport');
const isLoggedIn = require('./middlewares/isLoggedIn');
const isLoggedOut = require('./middlewares/isLoggedOut');

app.use(require('express-session')({ secret: 'abdfrv jhrjewrjwerje', resave: true, saveUninitialized: true }));

app.use(passport.initialize());
app.use(passport.session());


app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));

// Way to user routers
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
Ye code bhi ek Express.js app hai jo Passport.js ke saath user authentication handle karta hai.

1. Express aur session setup: App create hota hai, express-session configure hota hai aur Passport initialize hota 
hai with session support.
2. View engine aur form parsing: Handlebars (hbs) set hota hai aur URL-encoded form data parse hota hai.
3. Routers: 
   - '/auth' route ke liye authentication-related routes use hote hain (signup, login), sirf logged-out users ke liye.
   - '/' route ke liye user-specific pages use hote hain, sirf logged-in users ke liye.
4. Logout: req.logout() se user ka session destroy hota hai aur login page pe redirect hota hai.
5. MongoDB connection: MongoDB connect hota hai aur server start hota hai port 4444 pe.

Basically, ye code ek **modular authentication system** implement karta hai jahan login/signup routes alag router me hain aur 
middleware se route access control hota hai.

*/