const { unlink } = require('node:fs/promises'); // Importing the unlink function from the fs/promises module
const path = require('path'); // Importing the path module for handling file paths

let fileName = 'sample.txt'; // Name of the file to be deleted
let filePath = path.join(__dirname, fileName); // Constructing the full path to the File

unlink(filePath) // Using unlink to delete the file
    .then(() => {
        console.log(`File ${fileName} deleted successfully.`);
    })
    .catch(err => {
        console.error(`Error deleting file ${fileName}:`, err);
    }); 



// Note: Ensure that the file exists before running this code, otherwise it will throw an error.


