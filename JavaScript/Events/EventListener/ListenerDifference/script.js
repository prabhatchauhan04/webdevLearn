

let button = document.querySelector('button');


// addEventListener mein dono chalenge first callback bhi aur second callback bhi
const firstCallback = () => {
    console.log("First Callback function for click");
}
button.addEventListener('click',firstCallback ) // button pr pehle call back attach kra

const secondCallback = () => {
    console.log("Second Callback function for click");
}

button.addEventListener('click', secondCallback) // button pr dusra call back attach kra


/*
    // isse added event listeners hta sakte
    button.removeEventListener('click', firstCallback) // ye remove krdega firstCallBack wale ko
*/

/*

// iss case mein Second Callback wala hi run hoga sirf 
// first run nhi hoga ab 
// overwrite hojaega 

button.onclick = () => {
    console.log("First Callback function for click");
}

button.onclick = () => {
    console.log("Second Callback function for click");
}

*/


