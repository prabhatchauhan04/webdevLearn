import React from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import { useState } from "react";
import { Link, Route, Routes } from "react-router";
import Navbar from "./components/Navbar";

const App = () => {

  return (
    <div>

      {/* 
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <Link to="/contact">Contact Us</Link> 
      */}
      
      
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />}>Home</Route>
        <Route path='/about' element={<About />}>About</Route>
        <Route path='/contact' element={<Contact />}>About</Route>
      </Routes>
      
    </div>
  );
};

export default App;



/*
Ah, this is a common question when working with **React Router**. Let’s break it down clearly and concisely.

---

# **1️⃣ `<Link>`**

* Basic component for navigation in React Router.
* Renders an `<a>` tag internally but prevents full page reloads.
* Usage:

```jsx
import { Link } from "react-router-dom";

<Link to="/about">About</Link>
```

* **Use case:** Simple navigation without needing styling for active state.

---

# **2️⃣ `<NavLink>`**

* Special version of `<Link>` that **knows if it’s “active”**.
* Automatically adds an `active` class (or a custom class) when the current route matches the link’s `to` prop.
* Usage:

```jsx
import { NavLink } from "react-router-dom";

<NavLink 
  to="/about" 
  className={({ isActive }) => isActive ? "active-link" : undefined}
>
  About
</NavLink>
```

* **Use case:** Navigation menus where you want to highlight the current page.

---

# **⚡ Key Differences**

| Feature        | Link       | NavLink                                                |
| -------------- | ---------- | ------------------------------------------------------ |
| Active styling | ❌ No       | ✅ Yes (`active` class or function)                     |
| Use case       | Simple nav | Menus, tabs, highlighting current page                 |
| Props          | `to`       | `to`, `className`, `style`, `end` (for exact matching) |

---

### Quick Tip:

* Use `<Link>` for buttons, cards, or anywhere you just want to navigate.
* Use `<NavLink>` for navigation bars, side menus, tabs — anywhere highlighting the current route matters.

---
*/
