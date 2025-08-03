
let inp = document.querySelector('input');


// focus is jab input k dibbe pr click kiya hua hota hai . jab woh typing wala blink kr rha hota hai 
inp.addEventListener('focus' , ev => {
    ev.target.classList.add('inp'); // target is key in ev object referring to jo select kra tha 
});


inp.addEventListener('blur' , ev => {
    ev.target.classList.remove('inp');
});




