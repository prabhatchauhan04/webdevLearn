const murgiBirth = require('./murgiBirth');
const andaBirth = require('./andaBirth');

console.log(murgiBirth);
console.log(andaBirth);


/*
// module: Every JS file in Node.js is treated as a separate module.
// module.exports: Object that defines what a file shares (exports) with others.
// require(): Function used to import exported code from another module.
*/

// 📘 Circular Dependency:
// Happens when two modules require each other.
// Example:
// andaBirth.js → require('./murgiBirth')
// murgiBirth.js → require('./andaBirth')
// 🔁 Creates a loop (A → B → A)
//
// 📘 How Node handles it:
// - Returns a partial (incomplete) export to break the loop.
// - So one of the imported objects may be empty or missing data.
