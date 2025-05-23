import React, { useEffect, useState } from "react";

export default function EffectExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `Clicked ${count} times`;
  }, [count]);

  return (
    <div className="example-card">
      <h3>useEffect Example</h3>
      <p>You've clicked the button {count} times.</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>

      <div style={{ padding: "1rem", backgroundColor: "#f0f0f0", marginTop: "1rem" }}>
        <code>
          {`useEffect(() => {`}
          <br />
          &nbsp;&nbsp;{`document.title = \`Clicked \${count} times\`;`}
          <br />
          {`}, [count]);`}
        </code>
      </div>
    </div>
  );
}
