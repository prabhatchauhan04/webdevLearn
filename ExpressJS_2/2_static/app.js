const express = require('express');
const app = express();
const path = require('path');

// Serving static files the easy way without middleware
// Everytime we include a file using script or style tag, it is a request to the server

// So we need to tell the server where to look for these files
// We can use express.static middleware to serve static files but here we will do it the bad way which we should not do in real world
app.get('/', (req, res) => {
    // __dirname = current directory from root 
    res.sendFile(path.join(__dirname, '/index.html')); // ab file bhej rhe hai index.html
    /*
    // ye na krna pade isliye hum sendFile use kr rhe hai
    res.send(`  <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <h1>Hello World!</h1>
                </body>
                </html>  `);
    */
});


// ab humne server ko bataya ki jab bhi koi styles.css ya file.js ke liye request kare to ye file bhej dena
// ye karna bahut hi bura practice hai, isliye hum express.static middleware use karte hai
// ye sirf example ke liye hai ki bina middleware ke bhi kaise kar sakte hai
app.get('/styles.css', (req, res) => {
    res.sendFile(path.join(__dirname, '/styles.css'));
});

// browser mein javascrip pheki toh woh usse console mein run krdega browser k
app.get('/file.js', (req, res) => {
    res.sendFile(path.join(__dirname, '/file.js'));
});


// yha sabki .get alag alag krni pad rhi ye dikkat hai
// sabko alag alag bhejna nhi chahte hum

app.listen(4444, () => {
    console.log('http://localhost:4444');
});









