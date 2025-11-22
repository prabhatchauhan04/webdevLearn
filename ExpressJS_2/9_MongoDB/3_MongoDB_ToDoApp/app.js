const path = require('path'); // Node.js module to handle file/folder paths
const express = require('express'); // Import Express framework
const app = express(); // Create Express app
const PORT = 4444; // Port on which the server will run

// Serve static files from the "public" folder (like HTML, CSS, JS for frontend)
app.use(express.static(path.join(__dirname, 'public')))

// Middleware to parse JSON data sent from frontend (AJAX, fetch)
app.use(express.json());

// Middleware to parse form data from frontend (HTML forms)
app.use(express.urlencoded({ extended: true }));

const { MongoClient, ObjectId } = require('mongodb'); // Import MongoDB client

// Connection URL for local MongoDB
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url); // create a client (bridge)
/*
MongoClient is a class provided by the MongoDB library.
Its job: connect your Node.js app to the MongoDB database server.
Think of it like a bridge between your app and the database.
*/

// Database Name
const dbName = 'Tasks'; // If DB exists, it will use it; else it will create a new one

let db = null; // Placeholder for database object

// Connect to MongoDB server
client.connect()
    .then(() => {
        console.log("nodejs connect with mongodb done") // Connection successful
        db = client.db(dbName); // Get database reference
    })
    .catch(err => {
        throw new Error(err.message); // Crash server if connection fails
    })

// ------------------------- ROUTES -------------------------

// Get all todos
app.get('/todos', (req, res) => {
    // Get reference to 'Todos' collection
    let Todos = db.collection('Todos'); // If collection exists, use it; else MongoDB creates it automatically

    Todos.find().toArray() // Fetch all documents in the collection
        .then(data => {
            res.send({
                msg: 'Todos fetched success',
                tasks: data // Send all tasks back to frontend
            })
        })
        .catch(err => {
            res.send({
                msg: err.message // Send error message if something goes wrong
            })
        })
})

// Add a new todo
app.post('/todos', (req, res) => {
    const { task } = req.body; // Get task value from frontend

    let Todos = db.collection('Todos'); // Get 'Todos' collection

    Todos.insertOne({
        task,        // Add the task text
        status: false // Default status is incomplete
    })

    res.send({
        message: "Insertion done",
        task // Send back the inserted task
    });
})

// Update todo status (complete/incomplete)
app.put('/todos', (req, res) => {
    const { id } = req.body; // Get task ID from frontend
    let Todos = db.collection('Todos'); // Get 'Todos' collection

    Todos.findOne({
        _id: new ObjectId(id) // Find the document with the given ID
    })
        .then(data => {
            // Get current status of the task
            Todos.updateOne({
                _id: new ObjectId(id)
            }, {
                $set: {
                    status: !data.status // Toggle status: true -> false, false -> true
                }
            })

            res.json({
                message: "Status updated successfully"
            })
        })

})

// Delete a specific todo
app.delete('/todos', (req, res) => {
    const { id } = req.body; // Get task ID from frontend

    let Todos = db.collection('Todos'); // Get 'Todos' collection

    Todos.deleteOne({
        _id: new ObjectId(id) // Delete document with this ID
    })

    res.status(205).json({
        message: "Todo deleted successfully"
    })
})

// Clear all completed todos
app.put('/clear-completed', (req, res) => {
    let Todos = db.collection('Todos'); // Get 'Todos' collection
    Todos.deleteMany({
        status: true // Delete all documents where status is true (completed)
    }).then((data) => {
        console.log(data); // Log deletion info
        res.send({
            msg: "All completed tasks are cleared",
            data
        });
    }).catch((err) => {
        res.send({
            msg: err.message // Send error if deletion fails
        })
    })
})

// ------------------------- START SERVER -------------------------

app.listen(PORT, () => {
    console.log(`http://localhost:` + PORT); // Log server URL
});
