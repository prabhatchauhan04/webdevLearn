
class Person {
    #secret = "Mera Secret"; // ye private data member hai (sirf issi class andar accessible rahega ye )
    constructor(name){
        this.name = name;
    }
    // getter function se return krwana padega
    getSecret(){
        return this.#secret;
    }
    // getter function and setter function
    get getName(){
        return this.name;
    }
    set setName(newName){
        this.name = newName;
    }
}

let p = new Person("Aditya");
console.log(p.getSecret());
// p.#secret hume error dega

p.setName = "Kareena Kapoor"; // ye ek hi argument lega setter function by default agar jyada bhejne ho toh send as a single object
console.log(p)

