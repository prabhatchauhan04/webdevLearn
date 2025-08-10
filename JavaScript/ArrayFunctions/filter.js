let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// ye bhi new array banata hai

// Using filter to get even numbers
let evenNumbers = arr.filter(num => num % 2 === 0);

console.log("Even Numbers from array arr :" , evenNumbers); // Output: [2, 4, 6, 8, 10]

// Using filter to get numbers greater than 5
let greaterThanFive = arr.filter(num => num > 5);   

console.log("Numbers greater than five in array arr" , greaterThanFive); // Output: [6, 7, 8, 9, 10]


// Using filter with a callback function
// This will log each value, index, and the entire array during the filtering process
let newArr = arr.filter(function(value , index , array) {
    // console.log(`Value: ${value}, Index: ${index}, Array: ${array}`);
    return value > 5;
});
console.log("New Array with values greater than 5:", newArr); // Output: [6, 7, 8, 9, 10]
