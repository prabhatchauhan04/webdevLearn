import React from "react";
import { useRef } from "react";

const TodoInput = ({ addTodo }) => {
  const inpRef = useRef();

  function addTodoHandler() {
    addTodo(inpRef.current.value);
    inpRef.current.value = "";
  }

  return (
    <div className="flex m-4">
      <input
        ref={inpRef}
        className="border-2"
        type="text"
        placeholder="Enter Task ...."
      />
      <button onClick={addTodoHandler}>Add Task</button>
    </div>
  );
};

export default TodoInput;

/*
useRef is a hook which returns an object with a current property set to the value passed to the hook.

For instance this:

 const numberRef = useRef(0);
// numberRef is initialised as an object with a current property
Would return an object like so:

 {current: 0};
// numberRef.current holds the value 0
This object is mutable so the current property can be changed. Importantly this object exists outside of React’s render cycle, so the value persists throughout a components lifecycle.

It also provides a way for developers to interact directly with DOM nodes, outside of React’s management of the Virtual DOM. React describes this an ‘escape hatch’.

We can use the ref attribute of React elements to set the “current” property to be the actual DOM node the element is rendered to. This way we can use the reference for old school DOM manipulation adding event listeners etc.

const divRef = useRef();

divRef is initialised with current property set to 'undefined' because we didn’t give a value to the hook.
...
const MyComponent = (props) => {
  return <div ref={divRef}> A Div! </div>;
};
...
by passing divRef to the ref={} attribute, when the component is mounted to the DOM the divRef.current property gets set to the actual DOM node, eg. "<div>A Div!</div>" 
WOAH

If that sounded like gibberish that’s because we’re wading into the world of React jargon.

Let’s back up a little now and get some wider context.

React, Rendering, and the DOM
React is a framework that uses a layer of abstraction away from the original browser DOM API (The Document Object Model that describes web pages as a tree of nested objects).

Using vanilla JavaScript we would have to go through the cycle of targeting and updating the DOM ourselves (Using document.querySelector() etc.).

But everytime we change a DOM node in this way, the whole DOM tree needs to be re-rendered. Changing inner text on that wee tiny <p> tag means having to re-render the whole Document!

Get Sam Dent’s stories in your inbox
Join Medium for free to get updates from this writer.

Enter your email
Subscribe
React however, works with a Virtual DOM. It keeps a track of changes in it’s own Virtual DOM before ‘mounting’ to the old school DOM in the way it deems most efficient.

By maintaining a virtual DOM React can figure out how to update only what is necessary, on a component by component basis.

It manages the DOM so we don’t have to!

When we trigger a state change in a component (calling setState()or the likes), only the components that need to change are changed, or re-rendered. They get mounted to the old school DOM fresh and new but with the state values updated. That is the basics of the React render cycle.

So in a nutshell, once upon a time poor developers had to spend time manipulating the DOM themselves, each time something in the DOM changed the WHOLE THING was changed, this made the DOM powerful but slow.

Then one day React came along and said “You’re a busy developer, why don’t you just tell us what’s important and we’ll manage that DOM stuff for you”

— Boom abstracted!

Well gee thanks!

But... what if we want to use React AND want, or really (like really, really) need, to change the old school DOM ourselves?

That’s where refs come in to the story. --pheww finally!!
*/
/*
Ah! You’re asking **why `useRef` is used here instead of a state variable** for the input in this `TodoInput` component. Let’s break it down clearly.

---

### **1️⃣ How it works in the code**

```js
const inpRef = useRef();
```

* `inpRef` creates a **reference to the DOM element** (the `<input>`).
* `inpRef.current` points to the actual input element.
* You can directly access `inpRef.current.value` to get the input’s current value without needing state.

Then in `addTodoHandler()`:

```js
addTodo(inpRef.current.value);
inpRef.current.value = "";
```

* Reads the input value
* Clears the input after adding

---

### **2️⃣ Why not use state (`useState`)**

If you used state instead:

```js
const [value, setValue] = useState("");

<input value={value} onChange={e => setValue(e.target.value)} />
```

* Every keystroke **updates state**, triggering a **re-render** of the component.
* For large forms or high-frequency inputs, this can cause unnecessary re-renders.

With `useRef`:

* **No re-renders** occur when the input value changes
* You only read the value **on demand** (when the button is clicked)
* More efficient for simple uncontrolled inputs like this

---

### **3️⃣ So basically**

| Approach   | Behavior                                         | When to use                            |
| ---------- | ------------------------------------------------ | -------------------------------------- |
| `useState` | Controlled input → re-renders on every keystroke | When you need to react to every change |
| `useRef`   | Uncontrolled input → no re-render on typing      | When you just need the value on submit |

---

✅ **Summary:**
`useRef` is used here because:

* We don’t care about updating the UI on every keystroke.
* We only need the input’s value when adding a todo.
* It avoids unnecessary re-renders, making it more efficient.

---

If you want, I can also **rewrite this component using `useState`** so you can **see the difference in behavior visually**.

Do you want me to do that?

*/