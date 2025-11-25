import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, reset } from "./actions/Counter";

/*
useSelector :--
Read Redux state in component.
const count = useSelector(state => state.count);
useDispatch :--
Get dispatch to send actions.
const dispatch = useDispatch();
dispatch({ type: 'INCREMENT' });
✅ TL;DR: Selector = read state, Dispatch = send action.
*/

const App = () => {
  // State ko pick krne ke liye we use-> useSelector
  const counterState = useSelector((state) => state.counterReducer);

  const dispatch = useDispatch();

  return (
    <div style={{ marginTop: "30px" }}>
      <CounterData counterState={counterState} />
      <MyButton text="Increment" fun={increment} />
      <MyButton text="Decrement" fun={decrement} />
      <MyButton text="Reset" fun={reset} />

      {/* 
      Counter: {counterState}
      <button onClick={() => dispatch(increment())}>Increment Counter</button>
      <button onClick={() => dispatch(decrement())}>Decrement Counter</button>
      <button onClick={() => dispatch(reset())}>Reset Counter</button> 
      */}
    </div>
  );
};

function CounterData({ counterState }) {
  console.log("Running CounterData");
  return <div>Counter: {counterState}</div>;
}

function MyButton({ text, fun }) {
  console.log("Running MyButton", text);
  // Kaunsa action krna hai uske liye we use dispatch
  const dispatch = useDispatch();

  return <button onClick={() => dispatch(fun())}>{text} Counter</button>;
}

export default App;

/*
---

# **Redux in Simple Hinglish**

### **1️⃣ Problem Redux solves**

* React me agar **bahut saare components me state share karni ho**, direct props drilling (parent → child → grandchild) messy ho jata hai.
* Example: Todo app me **header, sidebar, task list** sabko same state chahiye → props pass karte karte kaafi levels ho jaate.

### **2️⃣ Redux ka solution**

* Redux ek **central store** banata hai.
* **Sab components directly store se state le sakte hai**.
* State change ke liye **actions dispatch** karte hai.
* State change ka **logic reducer** me hota hai.

---

### **3️⃣ Important Terms (Hinglish)**

| Term                       | Meaning                                                     |
| -------------------------- | ----------------------------------------------------------- |
| **Store**                  | Ek jagah jahan **app ki saari state** hoti hai              |
| **Action**                 | JS object jo batata hai **“state me kya change karna hai”** |
| **Reducer**                | Pure function: `old state + action → new state`             |
| **Dispatch**               | Function jo **action store ko bhejta hai**                  |
| **Selector / useSelector** | Hook to **read state from store**                           |
| **Provider**               | Component jo **store ko React app me provide karta hai**    |

---

### **4️⃣ Flow Example (Hinglish)**

1. **User click karta hai button**
2. Component **dispatch action** karta hai

   ```js
   dispatch({ type: "INCREMENT" });
   ```
3. **Reducer** action dekhta hai aur **state update karta hai**
4. **Store** updated state save karta hai
5. **Component** state read karta hai → UI update

---

> Store toh immutable hai , toh state update krne k liye actions dispatch krne hi padte hai.
> Actions are basically "Krna kya hai" and reducers are basically "karna kaise hai".
> Reducers contains actual logic of what we should do on a particular action.
*/
/*
---

### **Context API**

* Har context **ek specific state/data ke liye** hota hai.
* Agar app me **bohot saari alag-alag state** hai → multiple contexts banane padenge.
* Fir **har component tree me unn contexts ko wrap karna padega** → `<ThemeProvider> <AuthProvider> <CartProvider> ... </>`
* Yeh quickly **messy aur hard to manage** ho jata hai.

---

### **Redux**

* Redux me **ek single central store** hota hai.
* State **slice-wise divide hoti hai** internally (reducers ke through).
* Component ko sirf **jo state chahiye wo connect karte ho** → wrap karne ki zarurat nahi har state ke liye.
* Large apps me **bohot clean & scalable**.

---

---

### **Context API & Re-rendering**

* Jab **context ka value change hota hai**, **har component jo `useContext` se subscribe hai** woh re-render hota hai.
* Agar ek hi context me **bohot saari state** rakhi hai → unnecessary re-renders ho sakte hain.
* Tum **`React.memo` ya `useMemo`/`useCallback`** ka use karke optimize kar sakte ho, **lekin manually karna padta hai**.

**Example:**

```jsx
const value = { count, increment }; // agar object new create ho raha hai har render, all children re-render honge
```

* Iska solution: `useMemo` se object memoize karna, ya alag context slices banake distribute karna.

---

### **Redux & Re-rendering**

* Redux me **`useSelector`** automatically **shallow compare** karta hai.
* Sirf **jo slice of state change hota hai**, wahi component re-render hota hai.
* Tumhe manual memoization ki usually zarurat nahi padti for basic state updates.
* **Advanced optimization:** Redux Toolkit me `createSelector` se derived state efficiently memoize hoti hai.

**TL;DR:**

* Context → re-render control mostly **manual**, large apps me tricky.
* Redux → **built-in memoization** via `useSelector` + selectors → performance optimized by default.

---

*/