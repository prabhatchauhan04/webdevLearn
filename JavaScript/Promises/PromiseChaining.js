
let p = new Promise((res , rej)=>{
    res(); // just for example har baar resolve hi hone do 
});


// .catch nhi likhrhe as har baar resolve hi hoga promise as res() ko hi call kra h bas

p
    .then(()=>{
        console.log("First Promise poora hua");
        return 2; // ye '2' will be returned as a data(argument) in promise jo ab return hoga . because promise hamesha promise hi return krta h
    })
    .then((data)=>{ // data : 2 jo upar se return hokr aaya as argument and ye .then will have upar wale returned promise ka handler
        console.log("Second Promise poora hua with data " , data);
        return data*2;
    })
    .then((upperSeAaayaData)=>{ // parameter ka naam kuch bhi dedo : upperSeAaayaData
        console.log("Third promise poora hua with data " , upperSeAaayaData);
        return upperSeAaayaData*2; // ab agar aur .then lgaenge toh woh usmein receive hojaega ye returned value
    })
    
// ye lgatar .then lga paarhe because upar wala .then ek promise dega and promise pr .then lga hi skte h. 



// ye kuch aise horha in reality 
/*

let p = new Promise((res, rej) => {
    res(); // Promise humesha resolve hoga
})


let p1 = p.then(() => {
    return new Promise((res, rej) => {
        res(2);
    })
})



// ab this will look like :
// p1 = new Promise((res, rej) => {
//         res(2);
//      })
// because promise p resolve hoga hi



let p2 = p1.then((data) => {
    console.log("First promise returned", data);
    return new Promise((res, rej) => {
        res(data * 2)
    })
})

p2.then(data => {
    console.log("Second promise returned", data)
})

And so on.........


*/


