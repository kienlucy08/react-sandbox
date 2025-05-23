import React from "react";
import JSXExample from "../examples/JSXExample";
import EffectExample from "../examples/EffectExample";

export default function LearnReactBasics() {
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
      <section className="concept-section">
        <h2>1. Syntax</h2>
        <p>
          React uses a combination of modern JavaScript (ES6+), JSX (JavaScript XML), and optional tools like CSS modules or TypeScript.
          Below are some key syntax rules and patterns you'll see reguarly.
        </p>
        <ul className="syntax-list">
          <li>
            <strong>JSX (JavaScript + XML):</strong> Components must return a single parent element.
            <pre>{`return(  
  <div>
    <h1>Hello!</h1>
  </div>
  );`}
            </pre>
          </li>
          <li>
            <strong>Props (like HTML attributes):</strong> Use camelCase, and wrap values in braces for expressions.
            <pre>{`<MyButton text="Click me" onClick={handleClick} />`}</pre>
          </li>
          <li>
            <strong>useState and Destructuring:</strong> Common way to track component state.
            <pre>{`const [count, setCount] = useState(0);`}</pre>
          </li>
          <li>
            <strong>Event Handlers:</strong> Write handlers inline or as named functions.
            <pre>{`<button onClick={() => alert('clicked!')}>Click</button>`}</pre>
          </li>
          <li>
            <strong>Fragments (`&lt;&gt; &lt;/&gt;`):</strong> Use when you don’t want extra DOM nodes.
            <pre>{`return (
  <>
    <Header />
    <Content />
  </>
);`}</pre>
          </li>
          <li>
            <strong>Optional Chaining (`?.`):</strong> Avoid crashes on undefined values.
            <pre>{`const name = user?.profile?.name;`}</pre>
          </li>

          <li>
            <strong>CSS Modules:</strong> Scope styles locally in `.module.css` files.
            <pre>{`import styles from './Button.module.css';
return <button className={styles.primary}>Go</button>;`}</pre>
          </li>
          <li>
            <strong>Class vs Functional Components:</strong> Today, prefer functional components with hooks.
            <pre>{`function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}`}</pre>
          </li>

          <li>
            <strong>Map & Keys:</strong> Looping in JSX requires a unique key.
            <pre>{`items.map(item => (
  <li key={item.id}>{item.name}</li>
));`}</pre>
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
      </section>

      <section className="concept-section">
        <h2>2. JSX</h2>
        <JSXExample />
      </section>

      {/* Uncomment once UseStateExample is fixed */}
      {/* <section className="concept-section">
        <h2>2. useState</h2>
        <UseStateExample />
      </section> */}

      <section className="concept-section">
        <h2>3. useEffect</h2>
        <EffectExample />
      </section>

      <section className="concept-section">
        <h2>4. Functions in React</h2>
        <p>Coming soon: Explore how functional components and hooks make React powerful and clean.</p>
      </section>
    </div>
  );
}
