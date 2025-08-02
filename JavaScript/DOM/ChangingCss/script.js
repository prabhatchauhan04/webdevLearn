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

