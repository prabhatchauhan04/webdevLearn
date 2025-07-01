
function createCounter(){

    let cnt = 0;

    return function(){
        cnt++;
        return cnt;
    }
}

let counter1 = createCounter();
let counter2 = createCounter();

console.log(counter1());
console.log(counter1());
console.log(counter1());
console.log(counter1());
console.log(counter1());

console.log(counter2());
console.log(counter2());
console.log(counter2());

