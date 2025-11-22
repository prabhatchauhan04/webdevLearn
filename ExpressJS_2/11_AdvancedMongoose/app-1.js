const path = require('path'); // Node ka built-in module for handling file/folder paths
const express = require('express'); // Express library import ki
const app = express(); // Express app create kiya
const PORT = 4444; // Server port define kiya
const mongoose = require('mongoose'); // Mongoose import kiya, MongoDB ke sath interact karne ke liye

app.use(express.urlencoded({ extended: true })); 
// Middleware: HTML forms se aane wale data ko parse karne ke liye
// extended: true → nested objects ko bhi parse kar sakta hai

// MongoDB ke local database se connect kar rahe hai
mongoose.connect('mongodb://localhost:27017/myDB')
    .then(() => {
        // DB connect hone ke baad server start hoga
        app.listen(PORT, () => {
            console.log(`http://localhost:` + PORT);
        });
    })

// ------------------- Models -------------------

// Customers model ke liye schema define kiya
const customerSchema = new mongoose.Schema({
    name: String, // Customer ka name
    email: String // Customer ka email
})
const Customers = mongoose.model('customers', customerSchema);
// 'customers' collection ke liye Mongoose model banaya

// Orders model ke liye schema define kiya
const ordersSchema = new mongoose.Schema({
    item: String, // Order me item ka naam
    customerId: mongoose.Schema.ObjectId // MongoDB unique ID jo customer ke saath link kare
})

const Orders = mongoose.model('orders', ordersSchema);
// 'orders' collection ke liye Mongoose model banaya

// ------------------- Routes -------------------

// GET /customers → saare customers fetch karne ke liye
app.get('/customers', async (req, res) => {
    let data = await Customers.find(); // MongoDB se saare customers fetch kiye
    res.send({
        message: 'Customers fetched successfully',
        customers: data
    })
})

// GET /orders → saare orders fetch karne ke liye
app.get('/orders', async (req, res) => {
    let data = await Orders.find(); // MongoDB se saare orders fetch kiye
    res.send({
        message: 'Orders fetched successfully',
        orders: data
    })
})
/*
    yha pr khud store krwa rhe customerId without populate
    isliye orders me sirf customerId hi dikhega, pura customer object nahi
    aur store bhi hum khud krenge customerId ko in orders collection me
*/