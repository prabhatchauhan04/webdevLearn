let arr = [1, 10, 0, 2, 4, 23];

// Strings sort krega (le)
arr.sort();
console.log(arr);

// Numberical values maani jaengi arrays ki
arr.sort((a, b) => {
    return a - b
})

console.log(arr);