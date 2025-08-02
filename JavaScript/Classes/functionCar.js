
function Car(name , price){
    this.name = name;
    this.price = price;
}

// Ab Car function k prototype mein print function daal diya . hence ab Car k saare object print function use kr paenge
// ye krna hard padrha alag se pura prototype mein daalna . class mein easily hojaega ye 
Car.prototype.print = function(){
    console.log("Name " , this.name);
    console.log("Price " , this.price);
}

let Hyundai = new Car("Creta" , 14);
let Maruti = new Car("Brezza" , 10);

Maruti.print();
Hyundai.print();


