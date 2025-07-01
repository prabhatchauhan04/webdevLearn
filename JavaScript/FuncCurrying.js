function add(num){
    
    if(!num) return 0;

    return function helper(v){
        
        if(!v) return num;

        num += v;
        return helper;
    }
}

console.log(add(1)(2)(3)());

