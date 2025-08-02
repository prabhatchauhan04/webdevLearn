function outer() {
    console.log("Outer", this); // person
    function inner() {
        console.log("Inner", this); // Global bcoz arrow function nhi h inner
    }

    inner();
}

let person = {
    name: 'Vikas'
}

outer.call(person);