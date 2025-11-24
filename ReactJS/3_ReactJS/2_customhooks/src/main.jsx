import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import useCounter from "./hooks/useCounter.jsx";
import useCounterAdvanced from "./hooks/useCounterAdvanced.jsx";

function App() {
  const [cnt, setCnt] = useCounter(0);

  return (
    <div>
      Counter: {cnt}
      {/* <button onClick={()=>setCnt()}>Update</button> */}
      <button onClick={setCnt}>Update</button>
    </div>
  );
}



function AdvancedApp() {
  const { cnt, increment, decrement, resetCounter } = useCounterAdvanced(0);

  return (
    <div>
      Counter: {cnt}
      <div>
        <button onClick={increment}>+</button>
        <button onClick={decrement}>-</button>
        <button onClick={resetCounter}>Reset</button>
      </div>
    </div>
  );
}




createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AdvancedApp />
  </StrictMode>
);


/* 
Absolutely! Let’s break this down carefully.

---

## **1. What are React Custom Hooks?**

In React, **hooks** are functions that let you “hook into” React state and lifecycle features from **functional components**. Examples are `useState`, `useEffect`, `useReducer`, etc.

A **custom hook** is simply a **JavaScript function** whose name **starts with `use`** and **can call other hooks inside it**. It lets you **reuse stateful logic across multiple components** without duplicating code.

---

### **Example of a Custom Hook**

Suppose you want to track the window size in multiple components:

```javascript
import { useState, useEffect } from 'react';

// Custom Hook
function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}

export default useWindowSize;
```

Then in a component:

```javascript
import React from 'react';
import useWindowSize from './useWindowSize';

function MyComponent() {
  const { width, height } = useWindowSize();

  return (
    <div>
      Window size: {width} x {height}
    </div>
  );
}
```

✅ Here, `useWindowSize` is a **custom hook**. It encapsulates the window resize logic and can be reused in multiple components.

---

## **2. How are Custom Hooks different from a regular function?**

At first glance, a custom hook is just a function. But there are key differences:

| Feature                                       | Regular Function                                  | Custom Hook                                                    |
| --------------------------------------------- | ------------------------------------------------  | -------------------------------------------------------------- |
| Can use React hooks (`useState`, `useEffect`) | ❌ No                                             | ✅ Yes                                                        |
| Purpose                                       | General logic, computations                       | Encapsulate **stateful logic**                                 |
| Naming                                        | Any name                                          | Must start with `use` (React enforces this for rules of hooks) |
| Reusability                                   | Can be reused, but state not shared automatically |  Encapsulates stateful behavior for reuse                       |
| React lifecycle awareness                     | ❌ Cannot respond to component lifecycle          | ✅ Can use `useEffect` and other hooks                        |

---

### **Example Comparison**

**Regular function:**

```javascript
function calculateSum(a, b) {
  return a + b;
}
```

* Just a plain function, no React state, no lifecycle hooks.
* Not specific to React components.

**Custom Hook:**

```javascript
import { useState } from 'react';

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}
```

* Uses React state (`useState`).
* Encapsulates behavior that React components can use.
* Must start with `use`.

---

### **3. Key Takeaways**

1. **Custom hooks = reusable, stateful logic.**
2. **Must start with `use`** so React knows it follows hook rules.
3. **Regular functions can’t use hooks**. If you try, React will throw an error.
4. Custom hooks **help separate concerns** and **avoid code duplication**.

---

*/

/*

---

# **1️⃣ Class Components**

* In class components, React provides **lifecycle methods** like:

| Lifecycle Phase         | Method                   |
| ----------------------- | ------------------------ |
| Mounting (first render) | `componentDidMount()`    |
| Updating (props/state)  | `componentDidUpdate()`   |
| Unmounting              | `componentWillUnmount()` |

Example:

```jsx
class MyComponent extends React.Component {
  componentDidMount() {
    console.log("Mounted!");
  }

  componentDidUpdate() {
    console.log("Updated!");
  }

  componentWillUnmount() {
    console.log("Unmounted!");
  }

  render() {
    return <div>Hello</div>;
  }
}
```

---

# **2️⃣ Functional Components**

* Functional components **don’t have built-in lifecycle methods**.
* Instead, React provides the **`useEffect` hook** to handle side effects, which can replicate lifecycle behavior.

### Examples:

```jsx
import { useEffect } from "react";

function MyComponent() {
  // ComponentDidMount
  useEffect(() => {
    console.log("Mounted!");

    // ComponentWillUnmount
    return () => {
      console.log("Unmounted!");
    };
  }, []); // empty dependency array → runs once on mount

  // ComponentDidUpdate
  useEffect(() => {
    console.log("Updated!");
  }); // no dependency array → runs after every render

  return <div>Hello</div>;
}
```

---

# **3️⃣ Key Differences**

| Feature                        | Class Components  | Functional Components                   |
| ------------------------------ | ----------------- | --------------------------------------- |
| Lifecycle methods              | Yes (built-in)    | No (use `useEffect` hook)               |
| State management               | `this.setState`   | `useState` hook                         |
| Side-effects handling          | Lifecycle methods | `useEffect` hook                        |
| Mounting, Updating, Unmounting | Explicit methods  | Managed via dependencies in `useEffect` |

---

# **✅ Summary**

* **Both have lifecycles**, but **class components use methods** and **functional components use hooks (`useEffect`)**.
* Functional components can do **everything class components can**, but in a more **declarative and flexible way**.

*/