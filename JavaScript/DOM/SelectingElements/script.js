let h1 = document.getElementById('heading-1'); // ye single uthakr laega
console.log(h1);

let p = document.getElementsByTagName('p'); // sare <p></p> tags utha laega
console.log(p);

let allMovieItems = document.getElementsByClassName('movie'); // saare elements with class name movie utha lega
console.log(allMovieItems);

// querySelector har cheez pr work krjaega id class or tag 
let firstHeading = document.querySelector('#heading-1'); // ye sabse pehle occurence utha lega
let allParagraphs = document.querySelectorAll('p'); // saare p tags utha lega


