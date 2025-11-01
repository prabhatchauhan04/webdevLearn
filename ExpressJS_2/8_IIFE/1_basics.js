// Immediately Invoked Function Expression (IIFE)
;(function(){
    console.log("Hello");
})();
/*
(function(){ ... })
This is a function expression, not a declaration.
Wrapping it in () makes JavaScript treat it as an expression so it can be invoked immediately.

(); at the end
This calls the function immediately after defining it.

; at the start
The semicolon ensures that if this IIFE comes after another statement without a semicolon, it won’t break the code.
It’s a defensive practice.
Inside the function
console.log("Hello"); runs once immediately.
Variables declared inside the function are local to it (avoid polluting global scope).
*/