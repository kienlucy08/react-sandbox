import React, { useState } from "react";
import JSXExample from "../examples/JSXExample";
import EffectExample from "../examples/EffectExample";

function CounterExample() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}


export default function LearnReactBasics() {
  const [showSyntax, setShowSyntax] = useState(false);
  const [showJSX, setShowJSX] = useState(false);
  const [showUseEffect, setShowUseEffect] = useState(false);
  const [showFunctions, setShowFunctions] = useState(false);

  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="page">
      <h1>React Basics</h1>

      <section className="intro-section">
        <p>
          Welcome to your React learning journey! React is a powerful JavaScript library for building user interfaces, particularly for single-page applications where you need fast, interactive experiences. In React, you build UIs using components — reusable building blocks that manage their own logic and rendering.
        </p>

        <div className="tips-box">
          <h3>Tips for Learning React</h3>
          <ul>
            <li>Components are reusable and should stay focused on one thing.</li>
            <li>Props are read-only, while state can change over time.</li>
            <li>useEffect is your go-to tool for handling side effects like fetching data or setting timers.</li>
            <li>Keep UI logic and business logic separated to keep components clean.</li>
            <li>Think in terms of "data flows down" — parent components pass data to children via props.</li>
          </ul>
        </div>
      </section>

      {/* Upcoming Sections */}
      {/* Collapsable sections!!! */}
      <section className="concept-section">
        <h2
          onClick={() => setShowSyntax((prev) => !prev)}
          style={{ cursor: "pointer", userSelect: "none" }}>
          {showSyntax ? "▼" : "▶"} 1. Syntax
        </h2>
        {showSyntax && (

          <ul className="syntax-list">
            <p>
              React uses a combination of modern JavaScript (ES6+), JSX (JavaScript XML), and optional tools like CSS modules or TypeScript.
              Below are some key syntax rules and patterns you'll see reguarly.
            </p>
            <li>
              <strong>JSX (JavaScript + XML):</strong> Components must return a single parent element.
              <br />
              <strong>Analogy:</strong>
              <p><em>Like putting groceries in one bag — many items, one container (a single parent div).</em></p>
              <pre>{`return(  
    <div>
      <h1>Hello!</h1>
    </div>
  );`}</pre>
            </li>
            <li>
              <strong>Props (like HTML attributes):</strong> Use camelCase, and wrap values in braces for expressions.
              <br />
              <strong>Analogy:</strong>
              <p><em>Props are like labeled packages you pass to a friend. They can read them but shouldn't change them.</em></p>
              <pre>{`<MyButton text="Click me" onClick={handleClick} />`}</pre>
              <button onClick={handleClick}>Click me!</button>
            </li>
            <li>
              <strong>useState and Destructuring:</strong> Common way to track component state.
              <br />
              <strong>Analogy:</strong>
              <p><em>Like a whiteboard where you can update the count — and React will re-render each time you erase and write a new number.</em></p>
              <pre>{`const [count, setCount] = useState(0);`}</pre>
              <CounterExample />
            </li>
            <li>
              <strong>Event Handlers:</strong> Write handlers inline or as named functions.
              <br />
              <strong>Analogy:</strong>
              <p><em>Like assigning a task to a robot: "When button is pressed, say 'Hi!'".</em></p>
              <pre>{`<button onClick={() => alert('clicked!')}>Click</button>`}</pre>
              <button onClick={() => alert('Button clicked!')}>Click me!</button>
            </li>
            <li>
              <strong>Fragments (`&lt;&gt; &lt;/&gt;`):</strong> Use when you don’t want extra DOM nodes.
              <br />
              <strong>Analogy:</strong>
              <p><em>Like clear plastic dividers - structure  without extra walls.</em></p>
              <pre>{`return (
    <>
      <Header />
      <Content />
    </>
  );`}</pre>
            </li>
            <li>
              <strong>Optional Chaining (`?.`):</strong> Avoid crashes on undefined values.
              <br />
              <strong>Analogy:</strong>
              <p><em>Like checking if a door is unlocked before opening it.</em></p>
              <pre>{`const name = user?.profile?.name;`}</pre>
            </li>

            <li>
              <strong>CSS Modules:</strong> Scope styles locally in `.module.css` files.
              <br />
              <strong>Analogy:</strong>
              <p><em>Like wearing a tailored outfit - no style clashes with others.</em></p>
              <pre>{`import styles from './Button.module.css';
  return <button className={styles.primary}>Go</button>;`}</pre>
            </li>
            <li>
              <strong>Class vs Functional Components:</strong> Today, prefer functional components with hooks.
              <br />
              <strong>Analogy:</strong>
              <p><em>Class components are like manual cars; functional ones are like automatic EVs - newer and smoother</em></p>
              <pre>{`function Welcome({ name }) {
    return <h1>Hello, {name}</h1>;
  }`}</pre>
            </li>
            <li>
              <strong>Map & Keys:</strong> Looping in JSX requires a unique key.
              <br />
              <strong>Analogy:</strong>
              <p><em>Like naming each item in a checklist so React knows exactly which one to update.</em></p>
              <pre>{`items.map(item => (
    <li key={item.id}>{item.name}</li>
  ));`}</pre>
              <ul>
                {['Apple', 'Banana', 'Cherry'].map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </li>
            <li>
              <strong>Import/Export:</strong> Named and default exports from modules.
              <pre>{`// Named
  export function MyComponent() {}
  import { MyComponent } from './MyComponent';

  // Default
  export default App;
  import App from './App';`}</pre>
            </li>
          </ul>
        )}

      </section>


      <section className="concept-section">
        <h2
          onClick={() => setShowJSX((prev) => !prev)}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          {showJSX ? "▼" : "▶"}  2. JSX
        </h2>
        {showJSX &&
          <JSXExample />
        }
      </section>

      {/* Uncomment once UseStateExample is fixed */}
      {/* <section className="concept-section">
        <h2>2. useState</h2>
        <UseStateExample />
      </section> */}

      <section className="concept-section">
        <h2
          onClick={() => setShowUseEffect((prev) => !prev)}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          {showUseEffect ? "▼" : "▶"} 3. useEffect
        </h2>
        {showUseEffect &&
          <EffectExample />
        }
      </section>

      <section className="concept-section">
        <h2
          onClick={() => setShowFunctions((prev) => !prev)}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          {showFunctions ? "▼" : "▶"}4. Functions in React
        </h2>
        {showFunctions && (
          <p>Coming soon: Explore how functional components and hooks make React powerful and clean.</p>
        )}
      </section>
    </div>
  );
}
