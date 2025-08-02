class Car{
    constructor(name , price){
        this.name = name;
        this.price = price;
    }
}

let Maruti = new Car("Brezza" , 10);

console.log(Maruti);


// same work kr rha as above code but agar 1000 function hai toh protoype chaining mein dikkat rahegi function mein . class usse easy krdega
function Gaddi(name , price){
    this.name = name;
    this.price = price;
}

let Hyundai = new Gaddi("Creta" , 14);

console.log(Hyundai);

