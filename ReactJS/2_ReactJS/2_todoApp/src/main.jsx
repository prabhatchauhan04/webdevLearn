import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import InfiniteLoop from "./InfiniteLoop";

function TodoInput({todos, setTodos, taskValue, setTaskValue}){
  
  const addTodosHelper  = (ev)=>{
    ev.preventDefault();
    // We need task ki value here, so that I can add it to my todos state
    setTodos([...todos, taskValue]); // todos ko immutable kaha hai, toh we cannot change it
  }

  console.log("Running Todo Inp")
  return (
    <form action="#" onSubmit={addTodosHelper}>
      
      <input onChange={(ev)=>{
        // console.log(ev.target.value)
        setTaskValue(ev.target.value); 
      }} type="text" name="task" id="task" placeholder="Enter Task Name" /> <br />

      <button type="submit">Add Task</button>
    </form>
  );
}


function TodoDisplay({todos}){
  console.log("Running Todo Display")
  return (
    <ul className="tasklist">
      {todos.map((todo,indx)=>
        <li key={indx}>{todo}</li>
      )}
    </ul>
  );
}

function TodoApp() {
  console.log("Running Todo App")

  const [todos, setTodos]=useState(["Cricket"]);
  const [taskValue, setTaskValue] = useState("");

  return (
    <div>
      <h1>Todo Application - Component Wise</h1>
      
      <TodoInput 
        todos={todos} 
        setTodos={setTodos} 
        taskValue={taskValue} 
        setTaskValue={setTaskValue}
      />

      <TodoDisplay todos={todos} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TodoApp />
  </StrictMode>
);
        


{/* <input type="text" name="description" id="description" placeholder="Enter Description" /> <br /> */}



/*
Sure! Here’s a **small, clear explanation with code**:

---

# **Normal variable vs useState**

```jsx
import { useState } from "react";

function Counter() {
  let normalCount = 0; // normal variable
  const [stateCount, setStateCount] = useState(0); // state variable

  return (
    <div>
      <p>Normal: {normalCount}</p>
      <p>State: {stateCount}</p>
      <button onClick={() => {
        normalCount += 1;      // changes only for this render
        setStateCount(stateCount + 1); // triggers re-render
      }}>
        Increment
      </button>
    </div>
  );
}
```

### **What happens:**

* Clicking the button updates both `normalCount` and `stateCount`.
* **Normal variable resets** to 0 on re-render.
* **State variable keeps its value** across re-renders.

---

# **Key point**

> Only **state variables** (`useState`) or props survive re-renders. Normal variables are **reset every time the component 
function runs**.

__________________________________________________________________________________________________________________________________

---

### **Problem with using index as key**

1. React uses the **key to track which component belongs to which list item**.
2. If you use the **array index as key**, React thinks “the item at position 0 is still the same item, position 1 is still the same, etc.”
3. When the list **changes** (item added, removed, or reordered):

   * The **keys don’t match the actual items anymore**.
   * React **reuses DOM elements incorrectly**.
   * Component state or input values can **mix up**.

---

### **Example**

**Initial list:**

```jsx
["A", "B", "C"]  // keys = 0,1,2
```

UI:

| Key | Value |
| --- | ----- |
| 0   | A     |
| 1   | B     |
| 2   | C     |

**Remove B:**

```jsx
["A", "C"]  // keys = 0,1
```

**What React does:**

* Key 0 → still A ✅
* Key 1 → was B, now C ❌ React reuses the **B input element**, so **C appears in B’s place**

**UI after update (wrong):**

| Key | Value shown |
| --- | ----------- |
| 0   | A           |
| 1   | C (was B)   |

**The problem:** The **wrong input shows wrong value**, and any user-typed state in B is now lost or applied to C.

---

### **Correct approach**

Use **unique, stable IDs** as keys:

```jsx
[{id:101,name:"A"}, {id:102,name:"B"}, {id:103,name:"C"}]
```

React now matches items **by ID**, so removing or reordering items **doesn’t mix up the UI**.

---

**✅ Takeaway:**
Using **index as key breaks React’s ability to track list items**, causing **wrong UI updates, state loss, or value mix-ups** when 
the list changes.

---

*/

/*
Ah! You’re talking about the **“React batching setState updates”** example that often comes up in interviews. Let me explain it 
clearly with code and what happens.

---

# **React Batching Example**

```jsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}
```

---

### **What you might expect:**

Clicking the button **3 times** in the same function would increment `count` by 3.

* Expect: `0 → 3`

---

### **What actually happens (React batches updates):**

* React **batches state updates inside event handlers** for performance.
* All `setCount(count + 1)` see the **same old value** (`count = 0`)
* So after the click, `count` only increases by 1.

**UI output:**

```
Count: 1
```

---

### **✅ How to fix it using functional updates**

```jsx
const handleClick = () => {
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
  setCount(prev => prev + 1);
};
```

* Each update uses the **previous state** (`prev`)
* React still batches them, but it **correctly calculates the new state**

**UI output:**

```
Count: 3
```

---

### **Key points from this example**

1. React **batches multiple state updates** inside event handlers for performance.
2. Using `setState(newValue)` with the same reference can **overwrite updates**.
3. Using `setState(prev => prev + 1)` ensures **each update is applied correctly**.
4. Functional updates are **safer when multiple state updates happen together**.

---

*/