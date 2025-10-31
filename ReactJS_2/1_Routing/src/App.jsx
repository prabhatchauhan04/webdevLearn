import { useState } from 'react'
import './App.css'
import { Routes, Route, Link, NavLink } from 'react-router';
import Contact from './components/Contact';
import Home from './components/Home';



/*
React-Router package is a library jo kisine bna rakhi hai woh hum alag se use krte hai.
agar anchor tag use krte hai toh page reload hojata hai ye dikkat hai toh react ka use hi khatm hojata hai
bcoz react single page application banane mein help krti hai.
isliye frontend pr routing k liye we will use react-router.
BrowserRouter: A container component that uses the HTML5 history API to keep your 
UI in sync with the URL, enabling client-side routing in single-page applications (SPAs).
Routes and Route: Routes is a wrapper component that holds all the Route components, each 
defining a mapping between a URL path and the component to render when that path is matched.
*/

/*
Link: Basic navigation between routes. No styling for active links.
NavLink: Like Link, but adds styling when the link is active (i.e., matches the current URL). Great for menus.
NavLink mein humari jis pr bhi clicked hota hai i.e., jis bhi route pr hote hai uske respective element / uss component ya tag pr 
ek active naam ki class lga deta hai , ab jab bhi hume style krna ho based on jo bhi route hai woh active class ko 
css properties dekr hum style kr sakte hai. Active is ki kis route pr hai uss component k tag ko dedo active class.
*/


function App() {

  return (
    <div>

      {/*
        <Link to="/home">Home</Link>
        <Link to="/contact">Contact</Link>
      */}

      <NavLink to="/home">Home</NavLink>
      <NavLink to="/contact">Contact</NavLink>

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/contact" element={<Contact />} />  
      </Routes>

    </div>
  )
}

export default App
