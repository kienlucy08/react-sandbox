import React, { useState } from "react";
import JSXExample from "../examples/JSXExample";
import CodePractice from "../examples/CodeExample"
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
        <strong>Note * Do not worry about indenting your code in the coding examples, just about the content!</strong>

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
              <br />
              <strong>Analogy:</strong>
              <p><em>Like putting groceries in one bag — many items, one container (a single parent div).</em></p>
              <pre>{`return(  
    <div>
      <h1>Hello!</h1>
    </div>
  );`}</pre>
              <CodePractice
                prompt="Write a component that returns a single <div> with two paragraphs."
                defaultCode={`return(\n <div> \n  *Enter Code here*\n    \n     \n </div>\n)`}
                hint="Remember that JSX must return a single parent element. Use <p> tags inside a <div>."
                answer={`return (
  <div>
    <p>First paragraph</p>
    <p>Second paragraph</p>
  </div>
);`}

                onEvaluate={(code) => {
                  if (code.includes("<div>") && code.includes("<p>") && code.includes("</div>")) {
                    return "✅ Nice! Looks like valid JSX.";
                  }
                  return "❌ Make sure you return a single parent element.";
                }}
              />


            </li>
            <li>
              <strong>Props (like HTML attributes):</strong> Use camelCase, and wrap values in braces for expressions.
              <br />
              <br />
              <strong>Analogy:</strong>
              <p><em>Props are like labeled packages you pass to a friend. They can read them but shouldn't change them.</em></p>
              <pre>{`<MyButton text="Click me" onClick={handleClick} />`}</pre>
              <button onClick={handleClick}>Click me!</button>

              <CodePractice
                prompt="Write a button component that takes a 'label' prop and displays it inside."
                defaultCode={`function LabeledButton({ label }) {
  return (
    *Enter JSX here*
  );
}`}
                hint="Insert the label prop inside the button using curly braces: {label}."
                answer={`function LabeledButton({ label }) {
  return (
    <button>{label}</button>
  );
}`}

                onEvaluate={(code) => {
                  if (code.includes("<button>") && code.includes("{label}") && code.includes("</button>")) {
                    return "✅ Great use of props!";
                  }
                  return "❌ Remember to use curly braces to insert the prop inside JSX.";
                }}
              />
            </li>
            <li>
              <strong>useState and Destructuring:</strong> Common way to track component state. Takes in a parameter of the initial state. This initial state can be a primitive value such as a number, string or boolean or an object or array value. It can also be used as a function that returns a value.
              <br />
              <br />
              <strong>Analogy:</strong>
              <p><em>Like a whiteboard where you can update the count — and React will re-render each time you erase and write a new number.</em></p>
              <pre>{`/*Example interger count*/ \n const [count, setCount] = useState(0);`}</pre>
              <pre>{`/*Example string name*/ \n const [name, setName] = useState("Lily");`}</pre>
              <pre>{`/*Example boolean*/ \n const [isVisible, setIsVisible] = useState(true);`}</pre>
              <pre>{`/*Example object*/ \n const [user, setUser] = useState({name: "", age: 0});`}</pre>
              <pre>{`/*Example array*/ \n const [items, setItems] = useState([]);`}</pre>
              <pre>{`/*Example function*/ \n const [value, setValue] = useState(() => computeExpensiveValue());`}</pre>
              <CounterExample />
              <CodePractice
                prompt="Initialize state for a name variable using useState. Set the inital state to 'Ren' "
                defaultCode={`const [name, setName] = *fill in here*`}
                hint="Call useState with 'Ren' as the argument and destructure [name, setName]."
                answer={`const [name, setName] = useState('Ren');`}

                onEvaluate={(code) => {
                  if (code.includes("useState") && code.includes("[name") && code.includes("setName") && code.includes("Ren")) {
                    return "✅ You’ve initialized state properly!";
                  }
                  return "❌ Try using useState and destructuring.";
                }}
              />
            </li>
            <li>
              <strong>Event Handlers:</strong> Write handlers inline or as named functions. These can be used to alert users an action has occured or navigate the user to a section or page.
              <br />
              <br />
              <strong>Analogy:</strong>
              <p><em>Like assigning a task to a robot: "When button is pressed, say 'Hi!'".</em></p>
              <pre>{`/*Inline example*/ \n <button onClick={() => alert('clicked!')}>Click me!</button>`}</pre>
              <button onClick={() => alert('clicked!')}>Click me!</button>
              <pre>{`/*Referenced example*/ \n <button onClick={handleClick}>Click me!</button>`}</pre>
              <button onClick={handleClick}>Click me!</button>
              <CodePractice
                prompt="Write a button that shows an alert when clicked."
                defaultCode={`<button onClick={}>Click</button>`}
                hint="Use an arrow function inside onClick that calls alert()."
                answer={`<button onClick={() => alert('Hello!')}>Click</button>`}

                onEvaluate={(code) => {
                  if (code.includes("alert") && code.includes("() =>")) {
                    return "✅ Alert logic added!";
                  }
                  return "❌ Add an alert function inside the onClick.";
                }}
              />
            </li>
            <li>
              <strong>Fragments (`&lt;&gt; &lt;/&gt;`):</strong> Use when you don’t want extra DOM nodes.
              <br />
              <br />
              <strong>Analogy:</strong>
              <p><em>Like clear plastic dividers - structure  without extra walls.</em></p>
              <pre>{`return (
    <>
      <Header />
      <Content />
    </>
  );`}</pre>
              <CodePractice
                prompt="Change this code to return a fragment instead of a div! This just required removing the <div> and replacing it with a fragment"
                defaultCode={`function Demo() {
  return (
    <div>
      <h1>Title</h1>
      <p>Paragraph text</p>
    </div>
  );
}`}
                hint="Fragments use <> and </> instead of a div. No need for extra tags."
                answer={`function Demo() {
  return (
    <>
      <h1>Title</h1>
      <p>Paragraph text</p>
    </>
  );
}`}

                onEvaluate={(code) => {
                  if (code.includes("<>") && code.includes("</>")) {
                    return "✅ Nice! You've use a Fragment correctly.";
                  }
                  return "❌ Try wrapping the elements inside a Fragment using <> and </>.";
                }}
              />
            </li>
            <li>
              <strong>Optional Chaining (`?.`):</strong> Avoid crashes on undefined values. Works as an extra check without all the extra syntax.
              <br />
              <br />
              <strong>Analogy:</strong>
              <p><em>Like checking if a door is unlocked before opening it.</em></p>
              <pre>{`const name = user?.profile?.name;`}</pre>
              <CodePractice
                prompt="Safely access the email property inside user.account."
                defaultCode={`const user = {
  account: {
    email: "user@example.com"
  }
};

// Use optional chaining to safely access the email:
const email = *your code here*`}
                hint="Use optional chaining: ?. inbetween variables to safely access nested properties."
                answer={`const email = user?.account?.email`}
                onEvaluate={(code) => {
                  if (code.includes("user?.account?.email")) {
                    return "✅ Perfect! Optional chaining used correctly.";
                  }
                  return "❌ Try using user?.account?.email to safely access nested data.";
                }}
              />
            </li>

            <li>
              <strong>CSS Modules:</strong> Scope styles locally in `.module.css` files.
              <br />
              <br />
              <strong>Analogy:</strong>
              <p><em>Like wearing a tailored outfit - no style clashes with others.</em></p>
              <pre>{`import styles from './Button.module.css';
  return <button className={styles.primary}>Go</button>;`}</pre>
              <CodePractice
                prompt="Apply a locally scoped CSS class using CSS Modules."
                defaultCode={`// Button.module.css
.primary {
  background-color: blue;
}

// Button.jsx
import styles from './Button.module.css';

export default function Button() {
  return (
    <button className={/* your code here */}>Click Me</button>
  );
}`}
                hint="Use `styles.className` to appply classes from a CSS Module."
                answer={`<button className={styles.primary}>Click Me</button>`}
                onEvaluate={(code) => {
                  if (code.includes("styles.primary")) {
                    return "✅ Great! You're using CSS Modules correctly.";
                  }
                  return "❌ Try using styles.primary as the className.";
                }}
              />
            </li>
            <li>
              <strong>Class vs Functional Components:</strong> Today, prefer functional components with hooks.
              <br />
              <br />
              <strong>Analogy:</strong>
              <p><em>Class components are like manual cars; functional ones are like automatic EVs - newer and smoother</em></p>
              <pre>{`function Welcome({ name }) {
    return <h1>Hello, {name}</h1>;
  }`}</pre>
              <CodePractice
                prompt="Convert this class component to a functional component."
                defaultCode={`// Convert this:
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

// Into a functional component below:
function Welcome({ name }) {
  return *your code here*
}`}
                hint="Use a function with a `return` statement and directly access `name` from props."
                answer={`function Welcome({ name }) {
  return <h1>Hello, {name}</h1>;
}`}
                onEvaluate={(code) => {
                  if (code.includes("return <h1>Hello, {name}</h1>;")) {
                    return "✅ Nicely done! That's a clean functional component.";
                  }
                  return "❌ Remember to use return <h1>Hello, {name}</h1>.";
                }}
              />

            </li>
            <li>
              <strong>Map & Keys:</strong> Looping in JSX requires a unique key.
              <br />
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
              <CodePractice
                prompt="Use .map() to render a list of items with unique keys."
                defaultCode={`const items = [
  { id: 1, name: 'Apple' },
  { id: 2, name: 'Banana' }
];

// Render a list:
const list = items.map(item => (
  *your code here*
));`}
                hint="Each item should be inside an <li> and use item.id as the key."
                answer={`<li key={item.id}>{item.name}</li>`}
                onEvaluate={(code) => {
                  if (code.includes("key={item.id}") && code.includes("{item.name}")) {
                    return "✅ Perfect! You're mapping items with keys correctly.";
                  }
                  return "❌ Make sure to use key={item.id} and display item.name.";
                }}
              />

            </li>
            <li>
              <strong>Import/Export:</strong> Named and default exports from modules.
              <pre>{`// Named
  export function MyComponent() {}
  import { MyComponent } from './MyComponent';

  // Default
  export default App;
  import App from './App';`}</pre>
              <CodePractice
                prompt="Use a named export and import for MyComponent."
                defaultCode={`// In MyComponent.js
export function MyComponent() {
  return <div>Hello</div>;
}

// In App.js
*your code here*
`}
                hint="Use `import { MyComponent } from './MyComponent'` for named imports."
                answer={`import { MyComponent } from './MyComponent';`}
                onEvaluate={(code) => {
                  if (code.includes("import { MyComponent } from './MyComponent'")) {
                    return "✅ Great job importing the named export!";
                  }
                  return "❌ Use named import: import { MyComponent } from './MyComponent';";
                }}
              />

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
