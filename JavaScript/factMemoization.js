function fact(n) {
    let ans = 1;
    for (let i = 1; i <= n; i++) ans *= i;

    return ans;
}


function memoize(fn) {
    let cache = {}; // yha closure k use se store kr rhe purani values 

    return function (n) {
        // but if cache[n] has 0 / false then if block will not be entered toh ye dikkat h. isliye check using "if(n in cache) return cache[n];"
        if (cache[n]) {
            console.log("Returning the answer of", n, "from cache");
            return cache[n];
        }
        console.log("Calculating the answer for", n);
        let ans = fn(n);
        return cache[n] = ans;
    }
}


let myFact = memoize(fact);
console.log(myFact(5)); // Calculate kia
console.log(myFact(5)); // Cache se nikal kar diya
console.log(myFact(5)); // Cache se nikal kar diya