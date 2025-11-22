const path = require('path');
const express = require('express');
const app = express();
const PORT = 4444;

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Tasks').then((data) => {
    console.log("DB CONNECTED");
})

// 1. Create Schema (Schema = Blueprint of model/collection)
const TodoSchema = new mongoose.Schema({
    task: String, // ye constraint ki task ek string hogi humara mongoose tk hi hai, mongodb unaffected hai usmein koi constraint nhi hai
    status: { type: Boolean, default: false },
    date: { type: Date, default: Date.now }
})


// 2. Create a model (Collection, in which we insert documents), Consider it as JS class
const Todos = mongoose.model('Todos', TodoSchema);

// 3. Creating Documents
app.post('/todos', (req, res) => {
    const { task } = req.body;
    // Get the 'task' value sent from the frontend form or JSON request

    let newTodo = new Todos({ task }); // newTodo (document hai ye) is an instance of the Todos model (object jaise of a class Todos)
    // Create a new Todo document using the Todos model
    // 'Todos' is a Mongoose model, and we pass the task to it

    newTodo.save().then(() => {
        // Save the new todo document to the database
        // .save() returns a promise, so we use .then() when it’s done

        res.send({
            message: "Insertion done",
            task: newTodo
            // Send a response back to the frontend with a success message
            // Also include the newly created todo document
        });
    });

})


// Collection ka naam should be 'Todos' -> To store Documents
app.get('/todos', (req, res) => {
    Todos.find()
        .then(data => {
            res.send({
                msg: 'Todos fetched success',
                tasks: data
            })
        })
        .catch(err => {
            res.send({
                msg: err.message
            })
        })
})


app.put('/todos', async function (req, res) {
    const { id } = req.body;

    // Jab tak DB se find nahi hota aage nahi badhega
    let todo = await Todos.findOne({ _id: id });
    /*
    {
        task: 'Sing',
        status: false,
        _id: new ObjectId('68011f516f31c2a6eae1f033'),
        date: 2025-04-17T15:33:37.750Z
    }
    */
    todo.status = !todo.status;
    await todo.save(); // To again save this code

    res.json({
        message: "Status updated successfully"
    })
})

app.delete('/todos', async (req, res) => {
    const { id } = req.body;

    await Todos.deleteOne({
        _id: id
    })

    res.status(205).json({
        message: "Todo deleted successfully"
    })
})

app.put('/clear-completed', (req, res) => {
    Todos.deleteMany({
        status: true
    }).then((data) => {
        console.log(data);
        res.send({
            msg: "All completed tasks are cleared",
            data
        });
    }).catch((err) => {
        res.send({
            msg: err.message
        })
    })
})


app.listen(PORT, () => {
    console.log(`http://localhost:` + PORT);
});


/*

# 1️⃣ What a Model is

* A **Model** is like a **tool you use to interact with a collection** in MongoDB.
* You define it using a **Schema**, and then the Model gives you **methods to read/write/update/delete documents**.
* Think of it as a **class** in JavaScript:

```js
const Todo = mongoose.model('Todo', todoSchema);
```

* `Todo` = the model
* `todoSchema` = the structure of a single todo
* This model **represents the "Todos" collection** in the database.

---

# 2️⃣ Why we need it

Without a model:

* You’d have to write raw MongoDB commands every time.
* Example without model:

```js
db.collection('Todos').insertOne({ task: "Learn Mongoose", status: false });
```

With a model:

```js
const newTodo = new Todo({ task: "Learn Mongoose", status: false });
newTodo.save(); // easy and readable
```

✅ Model makes your code **cleaner, safer, and easier to work with**.

---

# 3️⃣ Analogy

* MongoDB = a **big filing cabinet** (collection)
* Schema = the **form/template** for each document in the cabinet
* Model = the **employee who knows how to read/write/update the files** according to the form

---

# 4️⃣ TL;DR

| Term     | Simple Meaning                                                |
| -------- | ------------------------------------------------------------- |
| Schema   | Blueprint of a document                                       |
| Model    | JavaScript object/class you use to **talk to the collection** |
| Document | Single record stored in the collection                        |

*/