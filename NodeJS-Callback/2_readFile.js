const {readFile} = require('node:fs');
const path = require('node:path');

let filePath = path.join(__dirname, 'example.txt');

// error first callback style (pehla argument mein error, dusra argument mein result)
readFile(filePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }else {
    console.log('File content:', data);
  }
});



