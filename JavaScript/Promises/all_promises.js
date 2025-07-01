function sortArray1(arr){
    return new Promise((res , rej)=>{
        setTimeout(()=>{
            arr.sort((a,b)=> a-b);
            res(arr);
        },5000);
    })
}


function sortArray2(arr){
    return new Promise((res , rej)=>{
        setTimeout(()=>{
            arr.sort((a,b)=> a-b);
            res(arr);
        },1000);
    });
}

// Get both sorted arrays and then provide the combined result of both
let arr1 = [4, 3, 5, 8, 7];
let arr2 = [81, 20, 69, 10];

Promise.all([sortArray1(arr1), sortArray2(arr2)]).then(botharrayJoAaega=>{
    let newArr = [...botharrayJoAaega[0] , ...botharrayJoAaega[1]];
    console.log(newArr);
});




