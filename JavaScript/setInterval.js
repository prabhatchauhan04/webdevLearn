

let count = 0;

let id = setInterval(() => {
  console.log("Tick", ++count);
  if (count === 5) {
    clearInterval(id); // stop after 5 ticks
  }
}, 1000);


