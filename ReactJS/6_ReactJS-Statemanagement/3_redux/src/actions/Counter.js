export function increment() {
    return { type: 'counter/increment' }
}

export function decrement() {
    return { type: 'counter/decrement' }
}


export function reset() {
    return { type: 'counter/reset' };
}

// this is returning {type: action_name} object . this is called action creator function. and object returned is called action object.

/*
hume inse uthane toh object hi hai with type property jo action ko describe karta hai. 
basically humne functions mein se object return krwa liye taki export easy ho jaye aur dusri files mein directly import krke function 
run krdo yhi waha object mil jaega.
Ab ye jo action object hai, ye store ko batata hai ki state mein kya change karna hai.
action k andar ek type property hoti hai jo action ka naam hota hai.
basically ye ek identifier hota hai jo reducer ko batata hai ki kaunsa kaam perform karna hai.
its hard to remember strings directly so we create functions that return these objects.
ex -> 
     const dispatch = useDispatch();

    this code :-  return <button onClick={() => dispatch(increment())}>Increment Counter</button>; 

yaha pe jab button click hoga toh increment function call hoga jo ek action object return karega with type 'counter/increment'.
phir ye action object dispatch function ke through store ko bhej diya jayega.
store phir is action ko reducer ko dega jaha pe ye dekha jayega ki action ka type kya hai aur uske accordingly state update hogi.
But agar hum dispatch({ type: 'counter/increment' }) directly likhte toh bhi same kaam hota. but ye yaad krna mushkil hota.
its easier to manage and remember functions rather than strings directly.
*/