// this Class is like Mongoose Model which is created using Schema
class Car {
    constructor(name, price) {
        // like SCHEMA defines structure in mongodb , here constructor defines structure of Car class 
        this.name = name;
        this.price = price;
    }

    print(){ // like methods in mongoose model to interact with db . ex -> save(), find() etc
        console.log(this.name)
    }

    save(){ // like save() method in mongoose model to store document in db

        return new Promise((res,rej)=>{
            // Store in db and call res()
        })
    }
}

// models in mongoose are like classes in js . ex -> Car class above
let A = new Car("BMW", 1000000); // A is an instance of Car class (just like document is an instance of Model in mongoose)
console.log(A);

A.print();



let person = {
    name: 'Vaibhav',
    isAdult: true
}

person.isAdult = !person.isAdult;

console.log(person);