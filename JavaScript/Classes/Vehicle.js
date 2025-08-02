
// Vehicle.prototype.__proto__ == Object.prototype
class Vehicle {
    constructor(company){
        this.compay = company;
    }
}

// Ab Car.prototype ka papa is Vehicle.prototype (Car.prototype.__proto__ == Vehicle.prototype)
class Car extends Vehicle {
    constructor(company , name , price){
        super(company); // vehicle k constructor ko call krdega . isse create hoga vehicle bcoz Vehicle is dad class of Car
        this.name = name;
        this.price = price;
    }
    print(){
        console.log("Name " , this.name);
        console.log("Price " , this.price);
        console.log("Company " , this.compay);
    }
}


let Audi = new Car("Audi R8" , "Audi Groups" , 100);

Audi.print();

