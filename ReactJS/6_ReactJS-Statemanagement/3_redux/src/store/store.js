import { createStore } from "redux";
import rootReducers from "../reducer/reducers.js";

// rootReducers ko use karke store create kar rahe hain . basically store k andar daal diye rootReducers ko.
const store = createStore(rootReducers);

export default store;

/*
Theory :--
Redux me store is the single source of truth for your app’s state.
createStore ek function hai jo Redux store create karta hai.
Store me 3 main kaam hote hain:
Holds state → app ka current state store me rahta hai.
Dispatch actions → state change karne ke liye actions send karte hain.
Subscribe listeners → state change hone pe notify karna, jaise UI update.
Analogy:
Socho store ek bank ka locker hai.
Reducers = rules for how money (state) deposit/withdraw hota hai.
Dispatch = deposit/withdraw request bhejna.
Subscribe = locker ka alarm, jo bata de agar kuch change hua.
*/