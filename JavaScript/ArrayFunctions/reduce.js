let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// reduce method is used to execute a reducer function on each element of the array, resulting in a single output value.
// The reducer function takes four arguments: accumulator, currentValue, currentIndex, and array.
// The first argument is the accumulated value previously returned in the last invocation of the callback,
// or initialValue, if supplied. The second argument is the current element being processed in the array.
// The third argument is the index of the current element being processed in the array.
// The fourth argument is the array reduce was called upon.


// Using reduce to calculate the product of all elements in the array

let product = arr.reduce((acc , value , index , array) => {
    return acc * value;
}, 1); // this '1' is the initial value for the accumulator

console.log("Product of array elements:", product);



// Using reduce to sum all elements in the array
// accumulator mein '1' diya hai and currentValue mein '2' diya hai initially bcoz accumulator ki intial value nhi di hui humne
// jo return hoga wo accumulator mein store hoga
// ek ek krke array ke elements currentValue mein aayenge
let sum = arr.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
});

console.log("Sum of array elements:", sum);



// Using reduce to find the maximum value in the array
let max = arr.reduce((accumulator, currentValue) => {
    return Math.max(accumulator, currentValue);
}, arr[0]);

console.log("Maximum value in the array:", max);




