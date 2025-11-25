
# React Component Lifecycle

Mounting → When a component is created and added to the DOM.  

Updating → When a component re-renders due to state or props changes.  

Unmounting → When a component is removed from the DOM, e.g., hidden, replaced, or navigated away.  

---

## 1. What is Component Lifecycle?

In React, **components don’t just appear and disappear randomly**. They go through **different phases** during their existence:

> From creation → updates → destruction

This entire “journey” is called the **component lifecycle**.

React gives **special methods (in class components) or hooks (in functional components)** to let you **run code at specific stages**.

---

## 2. Lifecycle Phases (Class Components)

React components (class-based) have **3 main lifecycle phases**:

1. **Mounting** – When the component is **created and inserted into the DOM**  
2. **Updating** – When the component **re-renders due to props or state changes**  
3. **Unmounting** – When the component is **removed from the DOM**

---

### A. Mounting Phase

This happens **once**, when the component is first added to the page.

Lifecycle methods in this phase:

| Method                                          | When it runs           | Purpose                                   |
| ----------------------------------------------- | -------------------- | ----------------------------------------- |
| `constructor(props)`                            | First, before anything | Initialize state, bind methods            |
| `static getDerivedStateFromProps(props, state)` | Before render          | Update state based on props (rarely used) |
| `render()`                                      | Always                 | Returns JSX to display                    |
| `componentDidMount()`                           | After first render     | Run code that needs DOM or API calls      |

**Example:**

```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    console.log('Constructor');
  }

  componentDidMount() {
    console.log('Component mounted');
  }

  render() {
    console.log('Render');
    return <div>{this.state.count}</div>;
  }
}
````

---

### B. Updating Phase

Occurs **when props or state change**, causing a re-render.

Lifecycle methods in this phase:

| Method                                               | When it runs        | Purpose                                                         |
| ---------------------------------------------------- | ------------------- | --------------------------------------------------------------- |
| `static getDerivedStateFromProps`                    | Before every render | Update state based on props                                     |
| `shouldComponentUpdate(nextProps, nextState)`        | Before render       | Decide if component should re-render (performance optimization) |
| `render()`                                           | Always              | Return JSX                                                      |
| `getSnapshotBeforeUpdate(prevProps, prevState)`      | Before DOM updates  | Capture info (e.g., scroll position)                            |
| `componentDidUpdate(prevProps, prevState, snapshot)` | After DOM updates   | Run side effects after update                                   |

**Example:**

```javascript
componentDidUpdate(prevProps, prevState) {
  if (prevState.count !== this.state.count) {
    console.log('Count changed!');
  }
}
```

---

### C. Unmounting Phase

Happens when the component is **removed from the DOM**.

Lifecycle method:

| Method                   | Purpose                                            |
| ------------------------ | -------------------------------------------------- |
| `componentWillUnmount()` | Clean up timers, subscriptions, or event listeners |

**Example:**

```javascript
componentWillUnmount() {
  console.log('Component removed');
}
```

---

## 3. Functional Components (Hooks)

Functional components don’t have class lifecycle methods, but we can achieve the same with **hooks**:

| Lifecycle Phase | Hook                                             | Example                          |
| --------------- | ------------------------------------------------ | -------------------------------- |
| Mounting        | `useEffect(() => {...}, [])`                     | Run once on mount                |
| Updating        | `useEffect(() => {...}, [dep1, dep2])`           | Run when dependencies change     |
| Unmounting      | `useEffect(() => {... return () => {...} }, [])` | Cleanup function runs on unmount |

**Example:**

```javascript
import React, { useState, useEffect } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  // Mounting
  useEffect(() => {
    console.log('Component mounted');

    // Unmounting
    return () => {
      console.log('Component unmounted');
    };
  }, []);

  // Updating
  useEffect(() => {
    console.log('Count changed:', count);
  }, [count]);

  return <button onClick={() => setCount(count + 1)}>{count}</button>;
}
```

---

## 4. Lifecycle Summary

1. **Mounting** → component is created

   * `constructor` → `render` → `componentDidMount`

2. **Updating** → props/state changes

   * `shouldComponentUpdate` → `render` → `getSnapshotBeforeUpdate` → `componentDidUpdate`

3. **Unmounting** → component is destroyed

   * `componentWillUnmount`

**Functional components use `useEffect`** to replace most of these lifecycle methods.

---