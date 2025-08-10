const {writeFile} = require('node:fs');
const path = require('node:path');

let filePath = path.join(__dirname, 'example.txt');

// error first callback style (pehla argument mein error, dusra argument mein result)
writeFile(filePath, 'Hello, World!', (err) => {   
    if (err) {
        console.error('Error writing file:', err);
    } else {
        console.log('File written successfully!');
    }
});
// This code writes "Hello, World!" to a file named 'example.txt'.
// If the file write is successful, it logs a success message; otherwise, it logs an error message.




