

function outer(){
    console.log("Outer" , this);
    
    // 'inner' (child function) function ka 'this' bhi humara 'outer (PARENT) function' k hi 'this' ko point krega in arrow function
    let inner = () => {
        console.log("Inner" , this); 
    }

    inner();
}

let person = {
    name : 'Prabh'
};

outer.call(person);


