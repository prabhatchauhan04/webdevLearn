import React, { createContext, useState } from "react";
import Child from "./Child";

const MoneyContext = createContext({
  money: "",
  description: "",
});

const TodoContext = createContext({
  todos: [],
});

const App = () => {
  // let todos = ["Cricket", "Sing", "Dance"];
  const [todos, setTodos] = useState(["Cricket", "Sing", "Dance"]);
  function addTodos(t) {
    setTodos((prev) => [...prev, t]);
  }

  console.log("Running App");

  let TodosData = {
    todos,
    addTodos,
  };

  return (
    <TodoContext.Provider value={TodosData}>
      <MoneyContext.Provider
        value={{ money: 1000, description: "Aman ke paise" }}
      >
        <Child />
      </MoneyContext.Provider>
    </TodoContext.Provider>
  );
};

export default App;
export { MoneyContext, TodoContext };



/*
---

# **1️⃣ Prop Drilling**

**Definition:**
Prop drilling happens when you pass data from a parent component to deeply nested child components **through multiple intermediate components** that don’t actually need the data.

**Example:**

```jsx
function App() {
  const user = "Alice";
  return <Level1 user={user} />;
}

function Level1({ user }) {
  return <Level2 user={user} />;
}

function Level2({ user }) {
  return <Level3 user={user} />;
}

function Level3({ user }) {
  return <h1>Hello, {user}</h1>;
}
```

**Problem:**

* Intermediate components (`Level1`, `Level2`) just pass the prop along
* Makes code harder to maintain, especially if many props are passed down

---

# **2️⃣ Context API**

**Definition:**
Context API allows you to **share data across the component tree without passing props manually** at every level.

**Example:**

```jsx
import React, { createContext, useContext } from "react";

const UserContext = createContext();

function App() {
  const user = "Alice";

  return (
    <UserContext.Provider value={user}>
      <Level1 />
    </UserContext.Provider>
  );
}

function Level1() {
  return <Level2 />;
}

function Level2() {
  return <Level3 />;
}

function Level3() {
  const user = useContext(UserContext);
  return <h1>Hello, {user}</h1>;
}
```

**Advantages:**

* No prop drilling
* Any component in the tree can access context
* Makes state sharing easier for global or widely-used data

---

# **3️⃣ Quick Comparison**

| Feature                 | Prop Drilling            | Context API                       |
| ----------------------- | ------------------------ | --------------------------------- |
| Data passing            | Through props explicitly | Through context provider/consumer |
| Intermediate components | Must pass props          | Can ignore if not needed          |
| Use case                | Simple, few levels       | Global or widely shared state     |
| Maintenance             | Harder with many layers  | Easier and cleaner                |

---

✅ **Summary:**

* **Prop drilling**: fine for small trees, becomes messy as depth increases.
* **Context API**: solves prop drilling, ideal for global state like theme, auth, or user data.

---
*/
