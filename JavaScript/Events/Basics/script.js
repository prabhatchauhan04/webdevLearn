
let btn = document.querySelector('button');

let cnt = document.querySelector('#counterValue');

btn.onclick = () => {
    let count = parseInt(cnt.innerText , 10); // 10 shows decimal number system mein hi parse kro
    cnt.innerHTML = count+1;
};

// Keyboard Event
// say koi key press ki 
// toh woh body hi toh khulti hai kisi web page ki toh key press krenge on keyboard toh woh body pr hi toh hoga event
/*
Event	    When It Fires	
keydown	    Fired when a key is pressed down (immediately when the key goes down)	
keypress	Fired after keydown, but only for keys that produce a character (letters, numbers, punctuation)
keyup	    Fired when a key is released (after pressing)
*/
let body = document.querySelector('body');
// ev : event ko represent kr rha key dabane pr
body.onkeydown = function(ev){
    console.log(ev.key); // key is property of ev event object jo keyboard ki jo key press hui woh bta rha
};



