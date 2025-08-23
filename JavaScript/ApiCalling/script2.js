
let btn = document.querySelector('button');

// Fetch API Example
// async await based
let URL = 'https://meowfacts.herokuapp.com/';

function loadData(data) {
    let p = document.createElement('p');
    p.innerText = data[0];
    document.body.appendChild(p);
}

// agar yha error aaya lets say fetch krra but nhi hua toh yha hum uske liye try catch use krte hai
async function getData(URL) {
    // ye asynchronous calls hai
    try {
        let res = await fetch(URL); // jab tk fetch complete nhi hota tab tk ye ruk jaega bcoz of await 
        let { data } = await res.json(); // await wali line k neeche code nhi chalega jab tk ye complete nhi hota bcoz of await
        loadData(data);
    } catch (error) {
        console.log('Error aaya hai : ', error);
    }
}

btn.addEventListener('click', function () {
    getData(URL);
});