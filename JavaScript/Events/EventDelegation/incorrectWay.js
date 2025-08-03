

let allDivs = document.querySelectorAll('div');
// console.log(allDivs);

// bcoz ismein har ek div pr event listener lgana padrha
for (let i = 0; i < allDivs.length; i++) {
    allDivs[i].onclick = (ev) => {
        console.log(ev.target)
    }
}



