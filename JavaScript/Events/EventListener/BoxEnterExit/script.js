


let box = document.querySelector('.box');

// box enter krte hi image colorful
box.addEventListener('mouseenter', (ev) => {
    console.log("Mouse Entered Box");
    document.querySelector('img').classList.remove('greyscale');
})

// box se bahar jaate hi image black and white
box.addEventListener('mouseleave', (ev) => {
    console.log("Mouse Left Box");
    document.querySelector('img').classList.add('greyscale');
})



