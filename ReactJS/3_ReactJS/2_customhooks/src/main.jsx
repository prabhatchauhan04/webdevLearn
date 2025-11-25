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
/*
React Fragments – Notes
Definition:
React Fragment lets you group multiple elements without adding extra DOM nodes.
Helps return multiple children from a component cleanly.
Syntax:
<React.Fragment>...</React.Fragment>
or shorthand:
<>...</>
___________________________________________________________________________________________________________________________________
Absolutely! Let’s merge the **concept + code + explanation** into **one concise example** for your `MyFragment`.

---

### **Custom Fragment Example (with explanation)**

```jsx
import React from "react";

// Simple custom fragment
function MyFragment({ children }) {
  // children can be single element or array of elements
  // React can render an array of elements directly
  return children;
}

function App() {
  return (
    <MyFragment>
      <h1>Title</h1>
      <p>Description</p>
      <button>Click Me</button>
    </MyFragment>
  );
}

export default App;
```

---

### **How it works**

1. JSX normally **doesn’t allow multiple siblings**:

```jsx
return <h1></h1> <p></p>; // ❌ Error
```

2. When using `MyFragment`:

```jsx
<MyFragment>
  <h1></h1>
  <p></p>
</MyFragment>
```

* `children` is **already an array of React elements**:

```js
[
  <h1>Title</h1>,
  <p>Description</p>,
  <button>Click Me</button>
]
```

* Returning `children` → React renders them **directly in the DOM** without extra wrappers.

---

### **Output in DOM**

```html
<h1>Title</h1>
<p>Description</p>
<button>Click Me</button>
```

✅ No extra `<div>` or wrapper added.

---

___________________________________________________________________________________________________________________________________
---

# **React Performance Optimization Hooks / HOC**

---

## **1️⃣ React.memo**

**What it is:**

* Higher Order Component (HOC) that **memoizes a component**.
* Prevents re-render if **props haven’t changed**.

**Why use it:**

* Useful for functional components that receive props but don’t need to re-render on every parent render.

**Example:**

```jsx
const Child = React.memo(({ name }) => {
  console.log("Child rendered");
  return <div>{name}</div>;
});

function Parent() {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <Child name="Alice" /> { Won’t re-render when count changes }
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

✅ `Child` renders **only if `name` changes`.

---

## **2️⃣ useMemo**

**What it is:**

* Hook that **memoizes a value or the result of a computation**.
* Recomputes **only when dependencies change**.

**Why use it:**

* Avoids expensive recalculations on every render.

**Example:**

```jsx
const expensiveCalculation = (num) => {
  console.log("Calculating...");
  return num * 2;
};

function App({ number }) {
  const result = React.useMemo(() => expensiveCalculation(number), [number]);

  return <div>Result: {result}</div>;
}
```

✅ `expensiveCalculation` runs **only when `number` changes**, not on every render.

---

## **3️⃣ useCallback** ✅

**What it is:**

* Hook that **memoizes a function** so its **reference stays the same** across renders.
* Prevents unnecessary re-renders in **child components that receive functions as props**.

**Why use it:**

* Every render creates **new function instances**.
* Passing functions to memoized children can still trigger **re-renders** unless the function is memoized.

**Example:**

```jsx
function Parent() {
  const [count, setCount] = React.useState(0);

  // Memoized function
  const increment = React.useCallback(() => {
    setCount(c => c + 1);
  }, []); // empty array → function never changes

  return <Child onClick={increment} />;
}

const Child = React.memo(({ onClick }) => {
  console.log("Child rendered");
  return <button onClick={onClick}>Increment</button>;
});
```

**Why we use `React.memo` with `useCallback`:**

1. `useCallback` → keeps the **function reference stable**.
2. `React.memo` → prevents the child from re-rendering if **props haven’t changed**.
3. Together → `Child` re-renders **only when truly necessary**.

---

## **4️⃣ Quick Comparison Table**

| Hook / HOC    | Memoizes            | Use Case                                        |
| ------------- | ------------------- | ----------------------------------------------- |
| `React.memo`  | Component           | Avoid re-render if props unchanged              |
| `useMemo`     | Value / Computation | Expensive calculation optimization              |
| `useCallback` | Function            | Stable function reference for memoized children |

---

## **5️⃣ TL;DR**

* **React.memo:** memoize a component → skip re-render if props unchanged
* **useMemo:** memoize a value → avoid expensive recalculation
* **useCallback:** memoize a function → avoid re-rendering child components due to new function references

---
*/
