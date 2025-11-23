const passport = require('passport');
const LocalStrategy = require('passport-local');
const Users = require('../model/Users')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,        // Google OAuth client ID from environment variables
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, // Google OAuth client secret from environment variables
    callbackURL: "http://localhost:4444/auth/google/callback" // URL Google redirects to after authentication
},
    async function (accessToken, refreshToken, profile, cb) {
        // This function is called **after Google authenticates the user**
        // Passport passes in:
        // - accessToken: token to access Google APIs on behalf of user
        // - refreshToken: token to get a new access token (if needed)
        // - profile: user profile info returned by Google
        // - cb: callback to tell Passport how to proceed

        console.log("ACCESS", accessToken, "Refresh", refreshToken, "Profile", profile);

        try {
            // Check if a user with this Google access token already exists in DB
            let newUser = await Users.findOne({
                google_access_token: accessToken
            })

            if (newUser) return cb(null, newUser); 
            // If user exists, call callback with user (success)

            // If user does not exist, create a new user in DB using Google profile info
            newUser = await Users.create({
                username: profile.displayName,            // Store user's Google display name
                google_access_token: accessToken,        // Store access token for reference
                profile_picture_google: profile.photos[0].value || '' // Store profile picture URL
            })

            cb(null, newUser); // Call callback with newly created user
        } catch (error) {
            cb(error); // Call callback with error if something goes wrong
        }
    }
));


passport.use(new LocalStrategy(async function verify(username, password, cb) {
    try {
        let existingUser = await Users.findOne({
            username
        })
        if (!existingUser) {
            // Error nhi tha user ne username galat daal diya, that means error ki jagah null,
            // user nhi milla toh uski jagah false
            return cb(null, false, { message: 'Incorrect username' });
        }

        if (existingUser.password != password) {
            return cb(null, false, { message: 'Incorrect password' });
        }

        return cb(null, existingUser);
    } catch (error) {
        // error first callbacks
        cb(error);
    }
}));

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function (id, done) {
    try {
        let user = await Users.findOne({
            _id: id
        })
        // console.log("Deserialize",user)
        done(null, user);
    } catch (error) {
        done(error);
    }
});

module.exports = passport