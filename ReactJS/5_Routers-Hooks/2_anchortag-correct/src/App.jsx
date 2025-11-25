import React from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Home from "./components/Home";
import { useState } from "react";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");

  const btnCSS = {
    // backgroundColor: "blue",
    // border: '1px solid black',
    display: 'flex',
    justifyContent: 'space-evenly'
  }

  /*
   Ab page refresh nhi horha but ye dikkat hai ki ab url change nhi horha it stays on localhost:5173/ thats it.
   toh woh /home , /about and /contact wagerah url mein lane k liye with also no page reload react-router use krenge
  */

  return (
    <div>
      <div className="btnGroups" style={btnCSS}>
        <button onClick={()=> setCurrentPage('home')}>Home</button>
        <button onClick={()=> setCurrentPage('about')}>About</button>
        <button onClick={()=> setCurrentPage('contact')}>Contact</button>
      </div>

      {currentPage == "about" && <About />}
      {currentPage == "contact" && <Contact />}
      {currentPage == "home" && <Home />}
    </div>
  );
};

export default App;
