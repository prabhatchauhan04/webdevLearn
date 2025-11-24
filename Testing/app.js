const express = require('express');
const { default: mongoose } = require('mongoose');
const User = require('./models/User');
const app = express();
const PORT = 4444;

app.set('view engine', 'hbs');
app.use(express.urlencoded({ extended: true }));

app.get('/hello', (req, res) => {
    res.send("hello");
})

app.get('/world', (req, res) => {
    res.send("world");

})

app.get('/user', (req, res) => {
    res.send({
        name: 'prabhat',
        email: 'prabhat@cb.com',
        password: 'password'
    })
})

app.get('/checkuser', async (req, res) => {
    const { email } = req.query;
    let user = await User.findOne({
        email
    })

    res.send(user);
})

app.listen(PORT, () => {
    console.log(`http://localhost:` + PORT);
});

module.exports = app;

// Unit Testing = Testing each function or module separately to ensure it behaves exactly as expected.