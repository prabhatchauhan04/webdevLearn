// Three ways to do this:
/*
1. call
2. bind
3. apply
*/
let person = {
    name: 'Vikas',
    age: 20
}

let person2 = {
    name: 'Aryan',
    age: 18
}

function print(city, country) {
    console.log(this);
    this.city = city;
    this.country = country;
}

// // pehli argument will become 'this'
// print.call(person2, "Delhi", "India"); // now inside print this will point to person2
// console.log(person2);

print.apply(person, ["Delhi", "India"]); // iss baar this k alawa arguments ko array mein bhejenge


// let f = print.bind(person, "Delhi", "India"); // function mein bind krdiya ye arguments
// f();
// console.log(person);

print();