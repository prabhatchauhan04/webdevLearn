import React from "react";
import { useState } from "react";
import { useEffect } from "react";

/*
No dependency array

useEffect(() => {
  console.log('Runs after every render');
});


Runs after every render, including initial mount and updates.
_____________________________________________________________________________________________________________________________________

Empty dependency array []

useEffect(() => {
  console.log('Runs only once on mount');
}, []);


Runs only once after the component mounts (like componentDidMount).
_____________________________________________________________________________________________________________________________________

With dependencies [dep1, dep2]

useEffect(() => {
  console.log('Runs when dep1 or dep2 changes');
}, [dep1, dep2]);


Runs only when the specified dependencies change.
_____________________________________________________________________________________________________________________________________

Cleanup function

useEffect(() => {
  const timer = setInterval(() => console.log('tick'), 1000);
  return () => clearInterval(timer); // cleanup
}, []);


The return function runs on unmount or before the effect runs next time (for updates).
*/

/*
# Mapping `useEffect` to Class Component Lifecycle Methods

In React, `useEffect` can be used to mimic **component lifecycle behavior**. Here's how it matches:

| `useEffect` Usage                                 | When it Runs                                          | Equivalent Class Component Lifecycle Method                 |
|---------------------------------------------------|-------------------------------------------------------|-------------------------------------------------------------|
| `useEffect(() => { ... }, [])`                   | Runs **once after mount**                              | `componentDidMount`                                         |
| `useEffect(() => { ... })`                       | Runs **after every render**                            | Combination of `componentDidMount` + `componentDidUpdate`   | 
| `useEffect(() => { ... }, [dep1, dep2])`         | Runs **only when dependencies change**                 | `componentDidUpdate` (for those specific props/state)       |
| `useEffect(() => { return () => { ... } }, [])`  | Cleanup **on unmount**                                 | `componentWillUnmount`                                      |
| `useEffect(() => { return () => { } }, [dep1])`  | Cleanup **before effect re-runs due to dep change**    | `componentWillUnmount` + part of `componentDidUpdate` logic |

*/


const App = () => {
  const [cnt, setCnt] = useState(0);

  // componentDidMount ka jo kaam hai woh useEffect kr rha in functional components

  useEffect(() => {
    // setCnt(cnt + 1); // this line with no dependency array will cause infinite loop bcoz rerender hoga setCnt se aur phir useEffect re run hoga and so on.
    console.log("Inside use effect");
  }, []);

  return (
    <div>
      I am app component: {cnt}
      <button onClick={() => setCnt(cnt + 1)}>Update cnt</button>
    </div>
  );
};

export default App;



/*
Great question — and this is **exactly where many people get confused.**
Let’s clear it up cleanly:

---

# ✅ **What happens when you have *no* dependency array?**

Example:

```js
useEffect(() => {
  // effect
  return () => {
    // cleanup
  };
});
```

### ✔️ 1. **The effect runs after every render**

Because no dependency array = “run on every render.”

### ✔️ 2. **The cleanup DOES run — but not on unmount only**

This is the part many people miss.

Cleanup runs **before the effect runs again**, *every time* (except the first mount).

### So the sequence is:

```
Initial mount → effect runs
Re-render → cleanup runs → effect runs again
Next re-render → cleanup runs → effect runs again
...
Unmount → final cleanup runs
```

### So the cleanup **absolutely does run**, and it runs VERY often.

---

# 🔥 Example with a socket (why this is bad)

If you do this:

```js
useEffect(() => {
  const socket = io.connect();

  return () => {
    socket.disconnect();
  };
});
```

Then on **every re-render**:

* You create a new socket
* You disconnect the old socket
* You create again
* and again
* and again…

This causes:
❌ Multiple rapid connect/disconnect events
❌ Flickering connections
❌ Performance issues
❌ Lost messages

---

# 🧠 Summary

### With **no dependency array**:

* Effect: runs on **every render**
* Cleanup: runs **before each re-run**, and **on unmount**

### With **empty array `[]`**:

* Effect: runs **only on mount**
* Cleanup: runs **only on unmount**

---
*/