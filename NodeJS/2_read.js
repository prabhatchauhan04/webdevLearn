
const { readFile } = require('node:fs/promises');
const path = require('path'); // Importing the path module for handling file paths


let filePath = path.join(__dirname, 'sample.txt');

// bcoz officially woh binary format mein read krta hai, so we need to read it in utf8 format
readFile(filePath, 'utf8')
    .then(data => {
        console.log('File content:', data);
    })
    .catch(err => {
        console.error('Error reading file:', err);
    });




