let ul = document.querySelector('ul');

console.log(ul)
console.log(ul.children) // list items 

let ulc = ul.children

for(let i = 0 ; i < ulc.length ; i++){
    console.log(ulc[i])
}