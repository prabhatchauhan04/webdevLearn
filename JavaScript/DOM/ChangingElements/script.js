


let p = document.querySelector('p');

// p.innerText = 'I am an updated paragraph';
p.innerText = '<li>I am a list inside para</li>'; // innerText parse nhi krega aur pura as it is dikha dega
// p.innerHTML = '<li>I am a list inside para</li>' // ye parse krlega aur as a list item dikhaega


let inp = document.querySelector('#name');

// input elements ke andar we use value
inp.value = "Aditya" // isse pehle se value dali aajaegi in input tag 
// we can't use inner Text/HTML in input
// .value is both getter and setter
// value set bhi krdi aur isse (inp.value) agar log kre toh print bhi hojaega value




