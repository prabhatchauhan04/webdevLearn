let print = () => {
    console.log(this);
}

let person = {
    name: 'Vikas'
}

let person1 = {
    name: 'Aryan'
}
/*
Arrow functions lexically bind this, meaning:
this is captured from the surrounding scope where the arrow function is defined, not where it's called.
So print.call(person) or print.call(person1) can't change this.
*/
print.call(person); 
print.call(person1);