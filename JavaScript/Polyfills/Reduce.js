let arr = [1, 2, 3, 4, 5];

Array.prototype.myReduce = function (cb, initialValOfAcc) {
    /*
        cb = (acc,val,indx,arr)=>{
            return acc + val;
        }
    */
    let originalArray = this;
    if (typeof (initialValOfAcc) == 'undefined') {
        initialValOfAcc = originalArray[0];
        start_index = 1; // For val we will pick from 1st index
        // if initialValOfAcc is not provided by the user, so 0th index ko initialValOfAcc bana denge
    } else {
        start_index = 0; // For val we will pick from 0th index, because in this case
        // we have initialValOfAcc provided by the user, so 0th index se shuru krenge val lena
    }

    let ans = initialValOfAcc;
    for (let i = start_index; i < originalArray.length; i++) {
        ans = cb(ans, originalArray[i], i, originalArray);
    }

    return ans;
}

let ans = arr.myReduce((acc, val, indx, arr) => {
    return acc * val;
}, 0); // The last argument — 0 — is the initial value of the accumulator(acc).

console.log(ans);

/*
let ans = arr.reduce((acc,val,indx,arr)=>{
    return acc * val;
}, 1)

console.log(ans);
*/