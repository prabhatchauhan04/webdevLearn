import React from "react";

function GrandChild() {
  console.log("I am a grandchild");
  return <div>I am a GrandChild</div>;
}

function Child({ val }) {
  console.log("I am inside Child");
  return (
    <div>
      I am a child: {val}
      <GrandChild />
    </div>
  );
}

function Parent() {
  console.log("I am inside Parent");
  const [val, setVal] = useState(0);

  return (
    <div>
      I am a parent
      <button onClick={() => setVal(val + 1)}>Update</button>
      <Child val={val} />
    </div>
  );
}
/*
Rerendering Issue :--
the thing is parent jaise hi rerender hoga when Update button will be clicked toh Child aur GrandChild dono rerender honge .
But hume GrandChild Aur Parent mein toh koi kaam tha hi nhi of rerendering bcoz usmein thodi na kuch change hua hai .
state variable 'val' ki jarurat toh sirf Child component ko hai toh ye dikkat h.
*/


const App = () => {
  return (
    <div>
      <Parent />
    </div>
  );
};

export default App;
