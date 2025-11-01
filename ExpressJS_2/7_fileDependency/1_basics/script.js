const { mergeSort } = require('./mergeSort');
const bubbleSort = require('./bubbleSort');

// Example usage:
const arr = [38, 27, 43, 3, 9, 82, 10];
console.log(mergeSort(arr)); // Output: [3, 9, 10, 27, 38, 43, 82]
console.log(bubbleSort(arr)); // Output: [3, 9, 10, 27, 38, 43, 82]

/*
// 📘 Dependency Map:
// A structure that shows which files or modules depend on which others.
// In Node.js, it means how your files are connected using require() or import.
// Example:
// script.js → requires mergesort.js & bubblesort.js
// mergesort.js → (no dependencies)
// bubblesort.js → (no dependencies)
//
// So the dependency map looks like:
// script.js
// ├── mergesort.js
// └── bubblesort.js
//
// Helps visualize relationships between files and their imports.

*/