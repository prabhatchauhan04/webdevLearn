/*
html pehle parse hota hai upar se neeche . aur jab woh parse hogi toh humara axios wala script pehle load hoga aur fir humara script3.js load hoga
toh jab humara script3.js load hoga tab axios wala script load ho chuka hoga isliye hum use kar paenge
agr humne axios wala script apne script3.js ke neeche dala hota toh jab hum apne script3.js me axios use karte toh error aata ki axios is not defined
agr humne apne script3.js ko head me dala hota toh jab humara script3.js load hota toh axios wala script load nahi hua hota isliye error aata ki axios is not defined
*/

// Axios wala method
let btn = document.querySelector('button');
let MEOW_URL = 'https://meowfacts.herokuapp.com/';

function loadData(data) {
    let p = document.createElement('p');
    p.innerText = data;
    document.body.appendChild(p);
}

// async function se kuch return karte hain toh woh promise return karta hai

async function getData(MEOW_URL) {
    // axios mein json ko parse karne ki zarurat nahi hoti
    // axios humein parsed json hi de deta hai
    try {
        let { data: {data} } = await axios.get(MEOW_URL);
        // data = data.data;
        // console.log(data);

        loadData(data);
    } catch (error) {
        alert(error.message);
    }
}


btn.onclick = () => {
    // console.log("Button Clicked");
    getData(MEOW_URL);

}






