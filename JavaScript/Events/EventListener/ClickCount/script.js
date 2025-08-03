let btn = document.querySelector('button');
let count = document.querySelector('#counterValue');


btn.addEventListener('click' , function(){
    
    // ye same hi work kr rha as neeche wala code
    // count.innerText = Number(count.innerText) + 1;

    count.innerText = +count.innerText + 1; // ab ye count.innerText string ko number hi maan lega bs ek uske aage plus lagane se

});







