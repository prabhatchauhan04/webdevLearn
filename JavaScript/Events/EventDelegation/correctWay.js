

let divParent = document.querySelector('.divParent');

// ab direct parent pr lga diya bs event listener aur child divs pr apne aap lg jaega
divParent.addEventListener('click', (ev) => {
    console.log(ev.target);
})




