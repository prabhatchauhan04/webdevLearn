const path = require('path'); // Node ka built-in module, mostly file/folder paths handle karne ke liye
const express = require('express'); // Express library import ki
const app = express(); // Express app create kiya
const PORT = 4444; // Server port define kiya
const mongoose = require('mongoose'); // Mongoose import kiya, MongoDB se connect aur schema define karne ke liye

app.use(express.urlencoded({ extended: true }));
// Middleware: Form data (x-www-form-urlencoded) ko parse karne ke liye
// extended: true → nested objects ko bhi parse kar sakta hai

// MongoDB se connect kar rahe hai local DB ke liye
mongoose.connect('mongodb://localhost:27017/myDB')
    .then(() => {
        // DB connect hone ke baad server start karenge
        app.listen(PORT, () => {
            console.log(`http://localhost:` + PORT);
        });
    })

// ------------------- Models -------------------

// Customers model schema
const customerSchema = new mongoose.Schema({
    name: String, // Customer ka name
    email: String // Customer ka email
})
const Customers = mongoose.model('customers', customerSchema);
// Ye 'customers' collection ke liye model create kiya

// Orders model schema
const ordersSchema = new mongoose.Schema({
    item: String, // Order me item ka naam
    customerId: {
        type: mongoose.Schema.ObjectId, // MongoDB ka unique ID for customer
        ref: 'customers' // Ye field reference karta hai 'customers' collection ko
        // populate ke liye useful hai → orders me customer details fetch kar sakte
    }
})

const Orders = mongoose.model('orders', ordersSchema);
// Ye 'orders' collection ke liye model create kiya

// ------------------- Routes -------------------

// GET /customers → saare customers fetch karne ke liye
app.get('/customers', async (req, res) => {
    let data = await Customers.find(); // MongoDB se saare documents fetch kiye
    res.send({
        message: 'Customers fetched successfully',
        customers: data
    })
})

// GET /orders → saare orders fetch karne ke liye
app.get('/orders', async (req, res) => {
    let data = await Orders.find().populate('customerId'); // mongodb mein lookup jaisa kaam karta hai . 
    // bina aggregation pipeline k hogya sb.
    // populate('customerId') → MongoDB me reference ko resolve karta hai
    // matlab har order me customerId ke jagah actual customer ka object aa jaega

    res.send({
        message: 'Orders fetched successfully',
        orders: data
    })
})
/*
Without populate: customerId is just an ID.

With populate: customerId becomes the full customer object automatically.

Example Response with populate:
{
    message: 'Orders fetched successfully',
    orders: [
  {
    "_id": "64fbf2b1234567890abcdef3",
    "item": "Laptop",
    "customerId": {
      "_id": "64fbf1a1234567890abcdef1",
      "name": "Rahul",
      "email": "rahul@example.com"
    }
  },
  {
    "_id": "64fbf2b1234567890abcdef4",
    "item": "Phone",
    "customerId": {
      "_id": "64fbf1a1234567890abcdef2",
      "name": "Anjali",
      "email": "anjali@example.com"
    }
  }
    ]

}

Example Response without populate:
{
    message: 'Orders fetched successfully',
    orders: [
  {
    "_id": "64fbf2b1234567890abcdef3",
    "item": "Laptop",
    "customerId": "64fbf1a1234567890abcdef1"  // Rahul's ID
  },
  {
    "_id": "64fbf2b1234567890abcdef4",
    "item": "Phone",
    "customerId": "64fbf1a1234567890abcdef2"  // Anjali's ID
  }
    ]

}

*/