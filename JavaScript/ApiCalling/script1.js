
let btn = document.querySelector('button');

// Fetch API Example
// promise based
let URL = 'https://meowfacts.herokuapp.com/';

function loadData(data) {
    let p = document.createElement('p');
    p.innerText = data[0];
    document.body.appendChild(p);
}

function getData(URL) {
    // promise ki form mein kr rhe bcoz har baar website data de hi thodi degi . ho sakta hai down ho ya kuch aur issue ho kabhi .
    // aur async task hai ye to ye bhi ho sakta hai ki data aane mein time lag jaye to hum promise use krte hai taki jab data aa jaye tab hum uske sath kuch kar ske
    // fetch ek promise return krta hai
    fetch(URL)
        .then((response) => response.json())
        .then(({data}) => {
            console.log(data);
            loadData(data);
        })
        .catch(error => {
            console.error('Error:', error)
        });
}

btn.addEventListener('click', function() {
    getData(URL);
});





