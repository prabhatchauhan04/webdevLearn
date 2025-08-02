

const user = {
  name: "Alice",
  greet() {
    console.log(this.name);
  }
};

// abhi 'this' humara normal pure code ko hi point krrha toh waha pr jo bhi 'user' naam se hai woh utha lega . 
// aur uss object k andar 'greet' hai jo woh utha lega
user.greet(); // Implicitly bound to `user`




