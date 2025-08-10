
const { writeFile } = require('node:fs/promises'); // Importing the writeFile function from the fs/promises module
const path = require('path'); // Importing the path module for handling file paths

/* 
  this is same as above code but using ES6 import syntax ( import wala syntax )

  import {writeFile} from 'node:fs/promises'; // Importing the writeFile function from the fs/promises module

*/

let filePath = path.join(__dirname, 'sample.txt'); // Define the path for the file to be created
// __dirname is a Node.js global variable that contains the directory name of the current module
// path.join is used to create a platform-independent file path
// ex : 'a'+'b' = ab , 'a'+'/b' = a/b , 'a/'+'/b' = a//b
// ex : path.join('a', 'b') = path.join('a/'+'/b') = path.join('a' , '/b') = a/b 

let fileName = 'sample.txt'; // Define the name of the file to be created

// promise-based file creation using writeFile
// writeFile returns a promise that resolves when the file is successfully created or written to
// agar filePath ki jagah fileName likha hota to current directory me file create hoti
writeFile(filePath, 'Hello World') // Write 'Hello World' to the file
    .then(() => {
        console.log(`File ${fileName} created successfully!`); // Log success message
    })
    .catch((error) => {
        console.error(`Error creating file ${fileName}:`, error); // Log error message if file creation fails
    })
    .finally(() => {
        console.log('File operation completed.'); // Log completion message
    });
// Note: This code creates a file named 'sample.txt' in the current directory with the content 'Hello World'.
// If the file already exists, it will be overwritten with the new content.


