

class Car{
    constructor(name , price){
        this.name = name;
        this.price = price;
    }
    // by default prototype mein ban gya ab ye function . toh ab sab use kr paenge
    // Class ne help krdi prototype mein add nhi krna pda alag se khud . 
    print() {
        console.log("Name " , this.name);
        console.log("Price " , this.price);
    }
}


let Maruti = new Car("Brezza" , 10);
let Hyundai = new Car("Creta" , 14);




