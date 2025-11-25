import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";

// In modern React + Redux: you can remove store.subscribe() unless you want manual logging/debugging.
// store.getState() → current state ka snapshot return karta hai.
// Jab bhi dispatch call ho aur state change ho → ye function run karo.
store.subscribe(() => store.getState()); // ye argument mein listener function hai jo har state change k baad run hota hai
/*
store.subscribe() ek method hai jo listener function ko register karta hai.
Ye listener har state change pe call hota hai.
Basically, “jab bhi store ka state change ho, mujhe notify karo” ka mechanism hai.
*/


// ye 'Provider' hai jo pure code mein store ka access dega
// ye humari redux state management library ko actually connect krta hai with react.
// store ko React tree me pass karta hai → useSelector, useDispatch hooks har child component me accessible ho jaye.
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);


// redux khud dekhleta internally state manage krna aur render krna components based on state change .
// redux kehta hai bs mujhe bta do kya tum update krna chahte ho mereko btado mein baki sb kuch bhi manage krlunga

