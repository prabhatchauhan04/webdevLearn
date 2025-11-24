import { createRoot } from "react-dom/client";

function App(Task, Description) {
  return (
    <div>
      <ul>
        <li>
          {Task}: {Description}
        </li>
      </ul>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <div>
    {App("Coding", "Love to Code")}
    {
    App("Swim", "Love to Swim")
    }
  </div>
);


/*
What is Babel?

Babel is a JavaScript compiler (transpiler).

Converts modern JavaScript (ES6+) or JSX into older JS that browsers can understand.

2️⃣ Why Babel is needed in React?

React uses JSX: a syntax that looks like HTML inside JS. Browsers cannot run JSX directly.

React also uses modern JS features (like import/export, arrow functions). Older browsers don’t support all of them.

Babel transforms JSX + modern JS → browser-compatible JS.
*/