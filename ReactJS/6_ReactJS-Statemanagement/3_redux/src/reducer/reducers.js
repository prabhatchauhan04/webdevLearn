import { counterReducer } from "./Counter";
import { combineReducers } from 'redux';

// saare reducers ko daal diya root reducer mein
const rootReducers = combineReducers({
    counterReducer
})
/*
Redux store me ek single root reducer chahiye.
Lekin real apps me state bohot complex hoti hai → alag-alag slices: user, cart, products, etc.
combineReducers ek helper function hai jo multiple reducers ko ek single root reducer me combine kar deta hai.
saare reducers ko combine krwa diya jata hai taki store ko ek hi reducer mile jo saari state manage kare.
Jab bhi koi action dispatch hota hai, root reducer us action ko saare child reducers ko forward kar deta hai.
Har child reducer apne slice of state ko update karta hai aur fir root reducer updated slices ko combine karke nayi 
overall state return karta hai.
Isse code modular, maintainable aur scalable ban jata hai.
*/
export default rootReducers;