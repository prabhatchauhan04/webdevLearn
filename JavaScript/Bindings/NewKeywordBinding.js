// ek constructor
function Person(name , city){
    // this -> {} ye this ko ek empty object se generate krdega jab ' new Person() ' call krenge
    this.name = name; // iske andar this.name ek variable bna rha 'name' naam se 
    this.city = city;
}

let p = new Person("Veeneta" , 22);

let p1 = new Person("Lisa" , 39);


