import { useState } from "react";
import { createRoot } from "react-dom/client";

function NonRenderingComponent() {
  // basically UI pr value of counter update nhi hongi
  // bcoz state variable use nhi kiye hai 
  // toh value of counter variable toh change horhi hai but jo html page pr load hogyi usmein toh counter ki jagah '1' tha initially
  // toh react usko change ui pr change nhi kr rha bcoz humne normal variables use kre h
  let counter = 1;
  console.log("Running this Non-rendering component");
  return (
    <div>
      <h1>Simple Counter  - NonRenderingComponent </h1>
      <span>{counter}</span> &nbsp;&nbsp;&nbsp;&nbsp;
      <button
        onClick={() => {
          counter++;
          console.log(counter);
        }}
      >
        ↑
      </button>
    </div>
  );
}

function ReRenderingComponent() {
  // HOOKS: useState(It will re-render the component jaha bhi yeh use hoga if its value changes where it is used)
  // useState k through bna variable jb change hoga toh react component rerender maardega
  const [counter, setCounter] = useState(1); // setCounter is used to update counter ki value
  console.log("Running this Re-rendering component");
  return (
    <div>
      <h1>Simple Counter - ReRenderingComponent</h1>
      <span>{counter}</span> &nbsp;&nbsp;&nbsp;&nbsp;
      <button
        onClick={() => {
          // setCounter ke through hi bas hum counter ki value ko update kar skte hai
          setCounter(counter + 1); // Since counter is immutable
          // We cannot do, counter = counter + 1; or counter++;
          console.log(counter);
        }}
      >
        ↑
      </button>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <div>{true ? <ReRenderingComponent /> : <NonRenderingComponent />}</div>
);

/*
---

# **React State & Immutability – Notes**

### **1️⃣ What “Immutable” means**

* Immutable = **value cannot be changed directly**.
* Instead of changing the original value, you **create a new copy with updated data**.

---

### **2️⃣ Why React state is immutable**

* React uses **state immutability** to detect **changes efficiently**.
* When you call `setState` or `setCount`, React **compares old state vs new state** to decide what to re-render.
* If you mutate state directly, React **may not detect changes** → UI won’t update.

---

### **3️⃣ Example – WRONG way (mutable)**

```jsx
const [numbers, setNumbers] = React.useState([1, 2, 3]);

// ❌ Direct mutation
numbers.push(4);
setNumbers(numbers); // React might not re-render
```

**Problem:**

* `numbers` is mutated in place → reference is same → React thinks state didn’t change

---

### **4️⃣ Example – RIGHT way (immutable)**

```jsx
const [numbers, setNumbers] = React.useState([1, 2, 3]);

// ✅ Create a new array
setNumbers([...numbers, 4]); // React detects change and re-renders
```

**Explanation:**

* `[...]` creates a **new array** → state reference changes → React re-renders component

---

### **5️⃣ Key points**

1. Always **create a new copy** of state when updating arrays or objects

   * Array → use `map`, `filter`, `concat`, spread `[...]`
   * Object → use spread `{ ...obj, key: value }`
2. Never mutate state directly
3. Helps React **efficiently detect changes**

---

### **6️⃣ TL;DR**

> React state is **immutable**. You should **never mutate state directly**, always return a **new copy** so React can re-render correctly.

---
*/

/*
---

# ✅ **What is Rendering in React?**

**Rendering = React creates UI elements from your components and displays them on the screen.**

When a component first appears on the page, React:

1. Runs the component function
2. Builds the virtual DOM for it
3. Shows it on the real browser screen

This is called **initial render**.

### Example

```jsx
function App() {
  return <h1>Hello</h1>;
}
```

React runs `App()` → creates `<h1>Hello</h1>` → displays it.

---

# 🔄 **What is Re-rendering in React?**

**Re-rendering = React updates the UI when something changes.**

A component re-renders when:

* its **state** changes → `setState()`
* its **props** change
* its **parent** re-renders

During a re-render, React:

1. Runs the component function *again*
2. Builds a new virtual DOM
3. Compares old vs new (diffing)
4. Updates only the changed parts on screen

---

# 🧠 **Easy Example (State Change)**

```jsx
const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
  {count}
</button>
```

When you click the button:

* `setCount` updates the state
* React **re-renders** the component
* It updates only the number on the screen

---

# 📝 **Short Version**

### **Rendering**

✔️ Happens first time
✔️ React draws UI on the screen
✔️ Component runs once

### **Re-rendering**

✔️ Happens when data changes
✔️ React runs the component again
✔️ Updates only the changed parts of the UI

---

# 🎯 **Super short definition**

* **Rendering:** showing the component for the first time
* **Re-rendering:** updating the UI when state/props change

---
*/

/*
useState and Component Rendering Explained:--

useState hook:
Allows a functional component to store and manage state.
On the first render, useState(initialValue) initializes the state.
It returns [state, setState] — the current state and a function to update it.

Initial Rendering:
React runs the component function for the first time.
It builds the virtual DOM and shows it in the browser.
This is called the initial render.

Re-rendering (after state update):
When you call the setState function from useState, React re-runs the entire component function.
A new virtual DOM is created and compared with the previous one (diffing).
React updates only the changed parts in the real DOM — the page is not fully reloaded.

Why this is efficient:
Even though the component function executes again, React only touches the DOM nodes that actually changed.
This prevents unnecessary full-page re-renders and preserves component state where needed.

Keys in lists (related to rendering):
When rendering lists, keys help React match old and new elements during re-renders.
This ensures that state and UI updates correctly, even if list items are added, removed, or reordered.
*/

/*
Recursing On Children
By default, when recursing on the children of a DOM node, React just iterates over both lists of children at the same time and 
generates a mutation whenever there’s a difference.

For example, when adding an element at the end of the children, converting between these two trees works well:

<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
React will match the two <li>first</li> trees, match the two <li>second</li> trees, and then insert the <li>third</li> tree.

If you implement it naively, inserting an element at the beginning has worse performance. For example, converting between these 
two trees works poorly:

<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
React will mutate every child instead of realizing it can keep the <li>Duke</li> and <li>Villanova</li> subtrees intact. This 
inefficiency can be a problem.

Keys
In order to solve this issue, React supports a key attribute. When children have keys, React uses the key to match children 
in the original tree with children in the subsequent tree. For example, adding a key to our inefficient example above can make the 
tree conversion efficient:

<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>
Now React knows that the element with key '2014' is the new one, and the elements with the keys '2015' and '2016' have just moved.

In practice, finding a key is usually not hard. The element you are going to display may already have a unique ID, so the key can 
just come from your data:

<li key={item.id}>{item.name}</li>
When that’s not the case, you can add a new ID property to your model or hash some parts of the content to generate a key. The 
key only has to be unique among its siblings, not globally unique.

As a last resort, you can pass an item’s index in the array as a key. This can work well if the items are never reordered, but 
reorders will be slow.

Reorders can also cause issues with component state when indexes are used as keys. Component instances are updated and 
reused based on their key. If the key is an index, moving an item changes it. As a result, component state for things like 
uncontrolled inputs can get mixed up and updated in unexpected ways.
*/
