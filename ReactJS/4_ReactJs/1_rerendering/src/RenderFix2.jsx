import React, { memo, useState } from "react";

/*
React.memo is a wrapper for functional components that prevents unnecessary re-renders.
It only re-renders the component if its props change.
By default, it does a shallow comparison of props.
You can provide a custom comparison function for more control.
Use it to optimize performance when a component renders often but its props rarely change.
*/
const Child1 = memo(function Child1({ data }) {
  console.log("Running Child", data);
  
  return <div>I am a Child : {data}</div>;
});

function Parent() {
  const [cnt, setCnt] = useState(0);
  return (
    <div>
      <Child1 data={cnt} />
      <button onClick={() => setCnt(cnt + 1)}>Update</button>
      <Child1 data="Hello" />
      <Child1 data="World" />
    </div>
  );
}

/*
Render Fix2 :-
'memo' use krne se ab sirf Child1 wala component jismein data={cnt} hai whi rerender hoga . Baki 2 Child1 Components nhi rerender honge 
*/

export default Parent;
