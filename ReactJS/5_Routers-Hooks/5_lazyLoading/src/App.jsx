import React, { lazy, Suspense } from "react";
// import About from "./components/About";
// import Contact from "./components/Contact";
// import Home from "./components/Home";
import { useState } from "react";
import { Link, Route, Routes, Navigate } from "react-router";
import Navbar from "./components/Navbar";

const Home = lazy(() => import("./components/Home"));
const About = lazy(() => import("./components/About"));
const Contact = lazy(() => import("./components/Contact"));

/*
Lazy Loading in React :--
Definition:
Lazy loading is a technique where a component or module is loaded only when 
it’s needed, instead of being included in the initial JavaScript bundle.
Purpose:
Reduces the initial bundle size
Improves app load time and performance
Useful for large or rarely-used components
How it works in React:
React provides React.lazy() to dynamically import components.
Lazy-loaded components must be wrapped in <Suspense> to provide a fallback UI while loading.
Use cases:
Large UI components
Modals, popups, or rarely-used features
Components in admin panels or dashboards
Key benefits:
Faster initial page load
Better performance on slow networks
Efficient code splitting
*/

const App = () => {
  return (
    <div>
      <Navbar />

      <Suspense fallback={<div>Loading data ...</div>}>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </div>
  );
};

/*
Bina lazy loading k pehle saare Home , About , Contact teeno load horhe the when we wrote <About /> , <Contact /> etc bcoz
at the end of the day these are just sugar coating for About() and Contact() . so jab code boht bda hota hai tab dikkat aati hai
bcoz tb faltu cheezein bhi load hoti pehle hi jinki jarurat tk nhi hai initially.
*/

export default App;
