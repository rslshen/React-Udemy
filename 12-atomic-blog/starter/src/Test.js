import { useState } from "react";

function SlowComponent() {
  // If this is too slow on your maching, reduce the `length`
  const words = Array.from({ length: 100_000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

// Slow component is passed as a child to Counter, so no re-renders happen when the Counter state changes
function Counter({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Counter</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {children}
    </div>
  );
}

export default function Test() {
  // const [count, setCount] = useState(0);
  // return (
  //   <div>
  //     <h1>Slow counter?!?</h1>
  //     <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
  return (
    <div>
      <h2>Slow component</h2>
      <Counter>
        <SlowComponent />
      </Counter>
    </div>
  );
}
