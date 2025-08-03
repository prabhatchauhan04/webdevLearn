let ul = document.querySelector('ul');

console.log(ul)

/*

let item = '<li class="movie">Thor</li>'

// timeout function se show horha update hote hue saare elements while inspecting
setTimeout(()=>{
    ul.innerHTML += item // O(N) time to add a single element bcoz saare elements phirse add honge har ek element add hone par
},3000)

// Why it's inefficient (O(N)):
// Every time you do ul.innerHTML += ..., the entire innerHTML is re-parsed.
// The browser re-creates all child elements from scratch, not just the new one.
// So, if you already had 10 items, adding the 11th means re-parsing all 11 from a string. That’s why it’s O(N).
// purana part padhega pura parse and phir uske andar add krrha hoga ye 
// ul.innerHTML = ul.innerHTML + item
*/

let li = document.createElement('li');
console.log(li)

li.innerText = 'Thor';
console.log(li)

li.classList.add('movie');
console.log(li)

/*
Method	                       What it does
element.classList.add()	       Adds a class
element.classList.remove()	   Removes a class
element.classList.toggle()	   Adds if missing, removes if present
element.classList.contains()   Returns true/false if the class is present
*/

setTimeout(()=>{
    ul.appendChild(li); // O(1) kra dega add bcoz sirf ek element add kr rhe 
},3000)

/*
Why it's efficient (O(1)):

Only one node (li) is appended to the DOM.

No need to re-parse the entire HTML or rebuild other elements.

The browser just updates the internal linked list/tree structure of the DOM once.
*/
