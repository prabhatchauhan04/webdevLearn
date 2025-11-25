import React, { useEffect, useState } from "react";

const FetchTodos = () => {
  const [todos, setTodos] = useState([]);

  /*
    function jab rerender hoga , then sabse aakhri mein useEffect chlega toh tab tk dom load ho chuka hai 
    toh dom load hone k baad ka kaam hai woh ab krdiya useEffect k andar.
    Here so pehle khaali todos array k liye hi ye list aur li elements load honge on ui . iske baad chlega useEffect aur fetch hone k baad todos fill hoga
    and uske baad list mein li elements aaenge on ui . humne useEffect callback mein timer maar diya 1 second ka toh ache se dikh jaega on ui ye sb hote hue .
  */

  useEffect(() => {
    setTimeout(() => {
      async function getTodos() {
        let url = `https://dummyjson.com/todos`;
        let data = await fetch(url);
        data = await data.json();
        console.log(data);
        setTodos(data.todos);
      }

      getTodos();
    }, 1000);
  }, []);

  return (
    <div>
      Todos Application
      {todos.map((t, indx) => {
        return <li key={indx}>{t.todo}</li>;
      })}
    </div>
  );
};

export default FetchTodos;

/*

## **1. What is a Side Effect?**

A **side effect** is any operation in a component that **affects something outside of the component** or interacts with the “outside world.”

In simpler terms:

> **Anything your component does that isn’t just returning JSX.**

---

## **2. Examples of Side Effects in React**

Some common side effects include:

* **Fetching data** from an API

  ```javascript
  fetch('https://api.example.com/data')
    .then(res => res.json())
    .then(data => setData(data));
  ```
* **Setting timers**

  ```javascript
  setTimeout(() => console.log('Hello'), 1000);
  ```
* **Subscribing to events**

  ```javascript
  window.addEventListener('resize', handleResize);
  ```
* **Updating the DOM manually** outside React

  ```javascript
  document.title = `You clicked ${count} times`;
  ```
* **Logging to console** (technically also a side effect)

---

## **3. Why Side Effects Matter**

React’s render process is supposed to be **pure**:

* A **pure function** (like `render`) always returns the same output for the same input and **doesn’t affect the outside world**.
* Side effects break this purity, so React **requires you to handle them carefully** using `useEffect` in functional components or lifecycle methods in class components.

---

## **4. How to Handle Side Effects in React**

* **Functional components** → use `useEffect()`
* **Class components** → use lifecycle methods:

  * `componentDidMount` → for initial side effects
  * `componentDidUpdate` → for side effects on updates
  * `componentWillUnmount` → for cleanup

**Example in functional component:**

```javascript
import React, { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);

  // Side effect: update document title
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  }, [count]); // runs when `count` changes

  return <button onClick={() => setCount(count + 1)}>Click Me</button>;
}
```

---

✅ **Summary:**

* Side effects = operations that **affect something outside the component**
* Examples: API calls, timers, subscriptions, logging, DOM updates
* Use `useEffect` or lifecycle methods to **handle them safely** in React
The useEffect Hook allows you to perform side effects in your components.

---
______________________________________________________________________________________________________________________________________________________________________

---

### **1. Virtual DOM**

* A **lightweight copy of the real DOM** stored in memory.
* React uses it to **efficiently update the UI** without touching the real DOM too much.
* Updating the virtual DOM is **fast**, and React calculates the minimal changes needed for the real DOM.

---

### **2. Diffing**

* The **process React uses to compare two versions of the virtual DOM** (old vs new).
* React identifies **what has changed** (added, removed, updated elements) instead of re-rendering the whole DOM.
* This is **much faster than updating the entire real DOM** every time.

---

### **3. Reconciliation**

* The process where React **applies the changes found during diffing to the real DOM**.
* React updates only the **necessary parts of the DOM**, making the UI efficient and performant.
* It’s basically **how React “syncs” the virtual DOM with the real DOM**.

---

✅ **In short:**
Virtual DOM → Diffing → Reconciliation = **React’s way of efficiently updating the UI**.

---

*/
