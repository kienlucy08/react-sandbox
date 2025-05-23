import React from "react";

export default function JSXExample() {
  const name = "React Student";
  const isLearning = true;

  return (
    <div className="example-card">
      <h3>JSX Example</h3>
      <p>Hello, {name}!</p>
      <p>{isLearning ? "You're learning JSX!" : "Keep going!"}</p>

      <div style={{ padding: "1rem", backgroundColor: "#f0f0f0", marginTop: "1rem" }}>
        <code>
          {`const name = "React Student";`}
          <br />
          {`<p>Hello, {name}!</p>`}
        </code>
      </div>
    </div>
  );
}
