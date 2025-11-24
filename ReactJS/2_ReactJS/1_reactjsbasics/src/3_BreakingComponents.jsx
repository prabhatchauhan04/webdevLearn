import { createRoot } from "react-dom/client";

function Todo({ name, description }) {
  return (
    <li>
      {name}: {description}
    </li>
  );
}

function LoadTodos({ todos }) {
  return (
    <ul>
      {todos.map((todo, indx) => (
        <Todo key={indx} name={todo.name} description={todo.description} />
      ))}
    </ul>
  );
}

const todos = [
  { name: "Coding", description: "Love to code" },
  { name: "Swim", description: "Love to Swim" },
  { name: "Dance", description: "Love to Dance" },
  { name: "Boxing", description: "Love to do Boxing" },
];

createRoot(document.getElementById("root")).render(
  <div>
    {/* <App name="Coding" description="Love to code" /> */}
    <LoadTodos todos={todos} />
  </div>
);

/*
A key serves as a unique identifier in React, helping to track which items in a list have changed, been updated, or removed. It is 
particularly useful when dynamically creating components or when users modify the list. When rendering a list, you need to assign 
a unique key prop to each element in the list. This helps React identify which elements have changed, been added, or been removed.
_______________________________________________________________________________________________________________________________________

---

# 🔍 **How keys actually work inside React (precise explanation)**

When React renders a list, it produces a virtual DOM tree like:

```jsx
<ul>
  <li key="a">A</li>
  <li key="b">B</li>
  <li key="c">C</li>
</ul>
```

React stores those keys in an internal structure.
On the **next render**, React compares the new list of keys to the previous list.

## ✔️ 1. **React uses keys to match old and new elements**

React doesn’t compare actual DOM nodes first; it compares **keys**:

Old keys:

```
a, b, c
```

New keys:

```
a, c, d
```

React immediately knows:

* `a` → same item (keep it)
* `b` → missing (remove it)
* `c` → same item (keep it)
* `d` → new (add it)

This allows React to skip expensive DOM operations and avoid re-rendering items unnecessarily.

---

## ✔️ 2. **Keys preserve component state correctly**

Imagine a list of input fields:

```jsx
items.map((item) => <input key={item.id} />)
```

If items are reordered *but keys stay with the same items*, React keeps the associated state (like what the user typed).

Without stable keys, React might think inputs have swapped places and **move the state incorrectly**.

---

## ✔️ 3. **Keys help React avoid re-rendering unchanged items**

React won’t re-render an item if:

* Its key is the same
* Its place in the list is the same

It simply reuses the previous component instance.

This makes the UI faster.

---

## ✔️ 4. **Keys help React know *where* changes occurred**

If you insert an item in the middle:

Old:

```
a, b, c
```

New:

```
a, X, b, c
```

React sees:

* `a` → same
* ⬆️ key mismatch here → this is new (insert X)
* `b`, `c` → shift down but still match by key → *don’t re-render*

Without keys, React would re-render **every item after the insertion**, which is wasteful and can break state.

---

# 🔑 **In one sentence**

**Keys let React match elements between renders so it can reuse, insert, move, or delete list items efficiently without messing up 
their state.**

---

*/
