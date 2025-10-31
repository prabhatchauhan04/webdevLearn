function hello(college, year) {
    console.log(this, college, year);
}

let obj = {
    name: 'abc'
}

Function.prototype.mybind = function (myObj, ...args) {
    let fun = this;
    /*
        fun = [Function: hello] // bcoz hello function ko hi call krrhe hai hum mybind ke through : hello.mybind(obj, "NSUT", 2025);
    */ 
   // args = ["NSUT", 2025]
    return function (...args1) {
        // args1 = [] // bcoz humne f() ko call krte time koi argument nhi diya neeche : f();
        fun.apply(myObj, [...args, ...args1]); // apply lets you set 'this' explicitly (hello function k this ko set krdiya as myObj)
        // fun.appy() also calls the function immediately
        // [...args, ...args1] = ["NSUT", 2025] hello function ke college and year parameters me jayega ye
    }
}

let f = hello.mybind(obj, "NSUT", 2025);
f();

// bind() method creates a new function where the value of this is explicitly set to the object you provide.

