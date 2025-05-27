// import React, { useEffect, useState } from "react";

// export function Interview() {
//   const [time, setTime] = useState(0);

//   const increment = () => {
//     setTime(time + 1);
//   };

//   const decrement = () => {
//     setTime(time - 1);
//   };

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setTime(prev => prev + 1);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, [time]); // Add time as a dependency to keep updating every second

//   return (
//     <>
//       <h1>Count: {time}</h1>
//       <button className="bg-red-400 font-mono font-bold p-2 m-2" onClick={increment}>
//         Click +
//       </button>

//       <button className="bg-black text-white rounded-2xl font-mono font-bold p-2 m-2" onClick={decrement}>
//         Click -
//       </button>
//       <h1>
//         {time}
//       </h1>
//     </>
//   );
// }
let a = 10;
let b=20 ;
console.log("Summ is " , (a+b));
