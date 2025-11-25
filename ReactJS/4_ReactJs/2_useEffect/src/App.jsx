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
