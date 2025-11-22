Let’s compare **Mongosh (shell) vs Compass** in a simple way:

---

| Feature               | Mongosh (Shell)                          | Compass (GUI)                                                     |
| --------------------- | ----------------------------------------- | ----------------------------------------------------------------- |
| **Type**              | Command-line interface (text-based)       | Graphical interface (visual, point & click)                       |
| **Usage**             | Type commands to interact with MongoDB    | Click and browse databases, collections, and documents            |
| **Learning Curve**    | Steeper for beginners                     | Beginner-friendly, easy to understand                             |
| **Speed**             | Very fast, lightweight                    | Slower, heavier than shell                                        |
| **Advanced Features** | Full control with MongoDB commands        | Limited to GUI features, but good for queries and visualization   |
| **Best For**          | Developers who like coding and automation | Visualizing data, exploring collections, editing documents easily |

---

**Super simple analogy:**

* **Mongosh** = typing commands in a notebook
* **Compass** = looking at the notebook on a computer screen with a nice interface

---

Mongosh / MongoDB Shell woh sab kr sakta hai jo compass k through krte hai hum .
____________________________________________________________________________________________________________
mongoDB connection string: mongodb://localhost:27017/

Open the mongosh:-- 
    > inside terminal type:
        mongosh   
/*
mongosh se direct hum mongodb commands run kr sakte sarre CRUD operations etc terminal mein hi .
mongosh opens the MongoDB shell (the command-line interface) so you can interact with your MongoDB server.
When you run mongosh, it tries to connect to the MongoDB server running on your machine (default: localhost:27017).
If the server isn’t running (mongod isn’t started), you’ll get a connection error.
It connects to a MongoDB instance (local or remote) and lets you type commands like:
show dbs → list all databases
use myDB → switch to a database
db.Todos.find() → see all documents in a collection
*/

1. View all available databases
Type inside terminal:
    show dbs;

2. To select a database(myDB here):
    use myDB;

3. To view all the collections
    show collections;

3. View the documents inside that collection
    db.orders.find();
    db.orders.insertOne({
        name:'mera product'
    })

    db.orders.deleteOne({
        name: 'mera product'
    })

Queries
        db.customers.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "_id",
                    foreignField: "customerId",
                    as: "customerOrders"
                }
            }
        ])
<!-- unwind -->
        db.customers.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "_id",
                    foreignField: "customerId",
                    as: "customerOrders"
                }
            },
            {
                $unwind: "$customerOrders"
            }
        ])


    db.customers.aggregate([
    {
        $lookup: {
        from: "orders",
        localField: "_id",
        foreignField: "customerId",
        as: "customerOrders"
        }
    },
    {
        $unwind: {
        path: "$customerOrders",
        preserveNullAndEmptyArrays: true
        }
  }
]);


db.mentors.aggregate([
  { 
    $match: { mentor: { $in: ["Kartik", "Kanak", "Abhishek"] } } 
  },
  { 
    $project: { name: 1, mentor: 1 } 
  },
  { 
    $addFields: { platform: "Coding Blocks" }  // it will be added as extra field
  }
]);


_________________________________________________________________________________________________________________________________________
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
_________________________________________________________________________________________________________________________________________

The aggregation pipeline is a way to process data step by step in MongoDB.

Each step is called a stage, and the output of one stage flows into the next stage (like a factory assembly line).

You use it with the aggregate() method:

db.Todos.aggregate([
  { $match: { status: true } },   // Stage 1: filter completed tasks
  { $group: { _id: "$userId", total: { $sum: 1 } } }  // Stage 2: count tasks per user
]);


Here:

$match → filter data

$group → group and calculate