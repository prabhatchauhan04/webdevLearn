import React, { useState } from "react";

function GrandChild() {
  console.log("I am a grandchild");
  return <div>I am a GrandChild</div>;
}

function Child() {
  const [val, setVal] = useState(0);
  console.log("I am inside Child");
  return (
    <div>
      I am a child: {val}
      <button onClick={() => setVal(val + 1)}>Update</button>
      <GrandChild />
    </div>
  );
}

// Push the val state inside Child only
function Parent() {
  console.log("I am inside Parent");
  return (
    <div>
      I am a parent
      <Child />
    </div>
  );
}

/*
Render Fix 1 :-
Parent ko needed nhi thi state bcoz show to Child mein kr rhe the toh humne uthakr State bna hi Child mein di .
Ab bs Child aur GrandChild rerender honge , na ki Parent .
*/

const RenderFix1 = () => {
  return (
    <div>
      <Parent />
    </div>
  );
};

export default RenderFix1;
