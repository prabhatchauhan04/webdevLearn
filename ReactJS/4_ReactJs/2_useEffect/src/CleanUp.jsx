import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const CleanUp = () => {
  const [cnt, setCnt] = useState(0);

  useEffect(() => {
    let id = setInterval(() => {
      setCnt((prevCnt) => {
        console.log(prevCnt);
        return prevCnt + 1;
      });
    }, 1000);

    // Cleanup function => next baar jab useEffect chlega toh usse just pehle ye cleanup functions chl jaenge
    return () => {
      clearInterval(id);
    };
  });

  return <div>{cnt}</div>;
};

export default CleanUp;

/*
1. What happens without the cleanup function

If you remove the cleanup function:

useEffect(() => {
  let id = setInterval(() => {
    setCnt((prevCnt) => prevCnt + 1);
  }, 1000);
});

useEffect runs after every render because there’s no dependency array.
Each render creates a new interval (setInterval) without clearing the old one.
This causes:
Multiple intervals running simultaneously → cnt increases faster and faster.
Memory leak → intervals stay alive even if the component is removed.
Console logs become huge and messy.

2. Why the cleanup function is needed

The cleanup function:

return () => {
  clearInterval(id);
};

Stops the previous interval before the next useEffect runs.
Prevents memory leaks and duplicate intervals.
React calls it before running the effect again or when the component unmounts.
*/
