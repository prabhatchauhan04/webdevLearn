let p = document.querySelector('p');

/*

p.style.color = 'orange';
p.style.backgroundColor = 'black'; // yha camel case mein likhenge css in js 
// ex -> css : background-color and js : backgroundColor

p.classList.add('myPara'); // ye 'p' pr class add krdega 
//    p.classList.remove('myPara'); // maanlo ye class pehle se added hai p par toh ab hat jaegi 

*/

setInterval(()=>{
    document.querySelector('body').classList.toggle('myPara'); // ye class myPara lga rha 
}, 20);

/*
classList.toggle('className')
This adds the class if it's not present, and removes it if it is present.
It "toggles" the presence of the class on and off.
*/