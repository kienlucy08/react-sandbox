import React, { useState, useEffect } from "react";
import JSXExample from "../examples/JSXExample";
import CodePractice from "../examples/CodeExample"
import EffectExample from "../examples/EffectExample";
import ProjectPractice from "../examples/ProjectExample";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';


function CounterExample() {
  const [count, setCount] = React.useState(0);

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increase</button>
    </div>
  );
}

const allProjectIds = ["eventHandlers", "propPractice"]

export default function LearnReactBasics() {
  const [showSyntax, setShowSyntax] = useState(false);
  const [showJSX, setShowJSX] = useState(false);
  const [showUseEffect, setShowUseEffect] = useState(false);
  const [showFunctions, setShowFunctions] = useState(false);
  const [showProps, setShowProps] = useState(false);
  const [showEvent, setShowEvent] = useState(false);
  const [showModules, setShowModules] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const { width, height } = useWindowSize();
  const [showStatusBar, setShowStatusBar] = useState(true);
  const [completedProjects, setCompletedProjects] = useState(() => {
    const saved = localStorage.getItem("reactBasicsProgress");
    return saved ? JSON.parse(saved) : [];
  })

  const markCompleted = (projectId) => {
    if (!completedProjects.includes(projectId)) {
      const updated = [...completedProjects, projectId];
      localStorage.setItem("reactBasicsProgress", JSON.stringify(updated));
      setCompletedProjects(updated);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 100000);
    }
  }

  const resetProgress = () => {
    localStorage.removeItem("reactBasicsProgress");
    setCompletedProjects([]);
  };

  const total = allProjectIds.length;
  const completed = completedProjects.length;

  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div className="page">
      {showConfetti && <Confetti width={width} height={height} />}
      <h1>React Basics</h1>

      <button
        onClick={() => setShowStatusBar(!showStatusBar)}
        className={`status-toggle-button ${showStatusBar ? "visible" : "hidden"}`}
      >
        {showStatusBar ? "⬇" : "⬆"}
      </button>

      <div className={`status-bar-container ${showStatusBar ? "visible" : "hidden"}`}>
        <div className="status-bar-content">
          <div>
            <strong>✅ {completed} of {total} projects completed.</strong>
            {completed === total && (
              <span className="completion-message">🎉 You've completed the React Basics!</span>
            )}
          </div>
          <button onClick={resetProgress}>🔄 Reset Progress</button>
        </div>
      </div>


      <section className="intro-section">
        <p>
          Welcome to your React learning journey! React is a powerful JavaScript library for building user interfaces, particularly for single-page applications where you need fast, interactive experiences. In React, you build UIs using components — reusable building blocks that manage their own logic and rendering.
        </p>
        <br />

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
          {showSyntax ? "▼" : "▶"} 1. Syntax (Overview of JSX, props, useState, etc.)
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
    /*Enter JSX here*/ \n \n 
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
          {showJSX ? "▼" : "▶"}  2. JSX Deep Dive
        </h2>
        {showJSX &&
          <JSXExample />
        }
      </section>

      <section className="concept-section">
        <h2
          onClick={() => setShowProps((prev) => !prev)}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          {showProps ? "▼" : "▶"} 3. Props
        </h2>
        {showProps &&
          <div>
            <p>
              <strong>What are Props?</strong><br />
              Props (short for "properties") are how components talk to each other in React. They are read-only values passed from a parent component to a child.
            </p>
            <p>
              <strong>Why are they important?</strong><br />
              They allow componets to be reusable and dynamic. You can pass in different data each time you use a componet, keeping you UI flexible and maintainable.
            </p>
            <pre><code>{`     function Welcome(props){
          return <h1>Hello, {props.name}!</h1>
      }
      
      function App() {
        return <Welcome name="Alice" />;
      }`}</code></pre>
            <p>
              <strong>Common Props Use Cases:</strong>
              <ul>
                <li>Displaying dynamic data (e.g., user names, scores).</li>
                <li>Passing Callbacks for user interactions.</li>
                <li>Controllling styling or behavior.</li>
              </ul>
            </p>
            <ProjectPractice
              projectId="propsPractice"
              prompt={`In this project, you'll practice how to build reusable React components using props.

You're creating a simple welcome dashboard. You'll build two components:
1. A Greeting component that takes a \`name\` prop and returns "Welcome back, NAME!".
2. A Status component that takes a \`name\` and an \`online\` prop (boolean) and displays whether the user is online.
Additionally, once you get a Status function that makes sense, optimize it! Use a termary expression to conditionally render online/offline status!

Why? Learning how to pass and use props in components is a foundational React skill for building dynamic interfaces. This exercise will help you get comfortable with passing strings, booleans, and rendering based on prop values.

Then, render 3 users with both components, each with different names and online statuses.
`}

              defaultCode={`function Greeting(props) {
  // TODO: Return a welcome message using props
}

function Status(props) {
  // TODO: Return a message like "NAME is online" or "NAME is offline"
}

function App() {
  return (
    <div>
      {/* TODO: Render Greeting and Status for 3 users */}
    </div>
  );
}`}

              hint={[
                "Use props.name in both Greeting and Status components.",
                "Use a conditional inside Status: props.online ? 'online' : 'offline'.",
                "You can reuse <Greeting name='...' /> and <Status name='...' online={true} />.",
                "Make sure to render both components for each user!"
              ]}

              answer={`function Greeting(props) {
  return <h2>Welcome back, {props.name}!</h2>;
}

function Status(props) {
  return <p>{props.name} is {props.online ? "online" : "offline"}.</p>;
}

function App() {
  return (
    <div>
      <Greeting name="Alice" />
      <Status name="Alice" online={true} />

      <Greeting name="Bob" />
      <Status name="Bob" online={false} />

      <Greeting name="Charlie" />
      <Status name="Charlie" online={true} />
    </div>
  );
}`}

              onEvaluate={(transpileCode) => {
                const messages = [];

                // Check component declarations
                if (!transpileCode.includes("function Greeting") || !transpileCode.includes("props.name")) {
                  messages.push("❌ Your Greeting component must be defined and use props.name.");
                }

                if (!transpileCode.includes("function Status") || !transpileCode.includes("props.name") || !transpileCode.includes("props.online")) {
                  messages.push("❌ Your Status component must be defined and use props.name and props.online.");
                }

                // Regex to detect <Greeting name="..." />
                const greetingUsage = transpileCode.match(/React\.createElement\s*\(\s*Greeting\s*,\s*{[^}]*name\s*:\s*["'][^"']+["']/g);
                const greetingCount = greetingUsage ? greetingUsage.length : 0;

                // Regex to detect <Status name="..." online={...} />
                const statusUsage = transpileCode.match(/React\.createElement\s*\(\s*Status\s*,\s*{[^}]*name\s*:\s*["'][^"']+["'][^}]*online\s*:\s*(true|false)/g);
                const statusCount = statusUsage ? statusUsage.length : 0;

                if (greetingCount < 3) {
                  messages.push("❌ Render the Greeting component at least 3 times with different names.");
                }

                if (statusCount < 3) {
                  messages.push("❌ Render the Status component at least 3 times with different users and online values.");
                }

                if (!transpileCode.includes("props.online ?")) {
                  messages.push("❌ Use a ternary expression to conditionally render online/offline status.");
                }

                const passed = messages.length === 0;

                const message = passed
                  ? "✅ Great job! You've successfully created and used reusable components with props and conditional rendering!"
                  : messages.join("\n");

                if (passed && typeof markCompleted === "function") {
                  markCompleted("propsPractice");
                }

                try {
                  const componentFunc = new Function("React", `${transpileCode}; return App;`);
                  const component = React.createElement(componentFunc(React));
                  return { message, component };
                } catch (err) {
                  return { message: `Code Error: ${err.message}`, component: null };
                }
              }}

              rootComponent="App"
            >
            </ProjectPractice>
          </div>
        }
      </section>

      <section className="concept-section">
        <h2
          onClick={() => setShowUseEffect((prev) => !prev)}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          {showUseEffect ? "▼" : "▶"} 4. State, useEffect and useState
        </h2>
        {showUseEffect &&
          <EffectExample />
        }
      </section>

      <section className="concept-section">
        <h2
          onClick={() => setShowEvent((prev) => !prev)}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          {showEvent ? "▼" : "▶"} 5. Event Handling
        </h2>
        {showEvent &&
          <div>
            <p>
              <strong>What is Event Handling?</strong><br />
              Event handling in JavaScript refers to writing code that listens for and responds to user intereaction or browser actions - such as clicks, key presses, mouse movements, form submission, etc.
            </p>
            <p>
              <strong>Why is it important?</strong><br />
              React uses a synthetic event system (a wrapper around the browser's native events) for consistency across all browsers. You assign event handlers directly to JSX elements using camelCase props like <code>onClick</code>, <code>onChange</code>, <code>onSubmit</code>, etc.
            </p>

            <pre><code>{`function Example() {
      const handleClick = () => {
        alert("Button Clicked!");
      };

      return <button onClick{handleClick}>Click me</button>;
 }`}</code></pre>

            <p>
              <strong>Common Events in React:</strong>
            </p>
            <ul>
              <li><code>onClick</code> - when a user clicks an element</li>
              <li><code>onChange</code> - when a value changes (like in an input)</li>
              <li><code>onSubmit</code> - when a form is submitted</li>
              <li><code>onMouseEnter</code> / <code>onMouseLeave</code> - mouse hover events</li>
              <li><code>onKeyDown</code> / <code>onKeyUp</code> - keyboard events</li>
            </ul>

            <p>
              <strong>Tips:</strong>
            </p>
            <ul>
              <li>Always use functions for handlers, not strings.</li>
              <li>Arrow functions can help with context (no need for binding)</li>
              <li>You can access the event object using the handler's first argument (e.g., <code>handleClick = (event) =&gt; { /* ... */}</code>).</li>
              <li>To prevent default behavior (like form submission refreshing the page), call <code>event.preventDefault()</code>.</li>
            </ul>
            <ProjectPractice
              projectId="eventHandlers"
              prompt={`You will now make a project that incorporates all of these Event Handlers. It will help solidify your knowledge of how they work within React.

You will start with a Profile function. Try combining them into a small interactive profile form. It should respond to input, show hover behavior, handle form submission, and react to key presses. You will need to update the profile's name live as the user types in the input. At the end of this project, users should be able to comfortably write and use:`}
              extraContent={
                <ul>
                  <li><code>onChange</code>: Capture input changes and update the state with <code>setName(value)</code></li>
                  <li><code>onClick</code>: Trigger an action when a button is clicked (e.g., show an alert with the name)</li>
                  <li><code>onSubmit</code>: Wrap the input in a form and prevent default submission with <code>e.preventDefault()</code>, then handle the submission logic.</li>
                  <li><code>onMouseEnter</code> / <code>onMouseLeave</code>: Change some visual feedback (like hover text or color) when the mouse enters or leaves an element.</li>
                  <li><code>onKeyDown</code> / <code>onKeyUp</code>: Detect specific keys being pressed and react (e.g., log to console or change a message while typing).</li>
                </ul>
              }
              defaultCode={`function Profile() {
  const [name, setName] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [hoverStatus, setHoverStatus] = React.useState("");
  const [keyStatus, setKeyStatus] = React.useState("");

  const handleOnChange = (e) => {
    // TODO: Handle the change event as the user is typing their name
  };

  const handleSubmit = (e) => {
    // TODO: Prevent default and mark as submitted
  };

  const handleReset = () => {
    // TODO: Clear the name and mark as not submitted
  };

  const handleMouseEnter = () => {
    // TODO: Set "Mouse Entered" as the hoverStatus
  };

  const handleMouseLeave = () => {
    // TODO: Set "Mouse Left" as the hoverStatus
  };

  const handleKeyDown = (e) => {
    // TODO: Set "Enter Pressed" if "Enter" was pressed as the keyStatus
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Enter your name" 
        value={name}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>Reset</button>
      <p 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        Hello, {name}
      </p>
      {submitted && <p>Form Submitted!</p>}
      <div style={{marginTop: "1rem", color: "gray"}}>
        {hoverStatus && <p>{hoverStatus}</p>}
        {keyStatus && <p>{keyStatus}</p>}
      </div>
    </form>
  );
}
`}
              hint={[
                "Use useState to store both the name and submission status",
                "Use onChange to update the name live",
                "Use onClick to reset the name",
                "Use onSubmit to capture form submission",
                "Use onMouseEnter / onMouseLeave for hover effects",
                "Use onKeyDown to listen for key presses (like Enter)"
              ]}

              answer={`function Profile() {
  const [name, setName] = React.useState("");
  const [submitted, setSubmitted] = React.useState(false);
  const [hoverStatus, setHoverStatus] = React.useState("");
  const [keyStatus, setKeyStatus] = React.useState("");

  const handleOnChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setName("");
    setSubmitted(false);
  };

  const handleMouseEnter = () => {
    setHoverStatus("Mouse Entered!");
  };

  const handleMouseLeave = () => {
    setHoverStatus("Mouse left!");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setKeyStatus("Enter pressed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Enter your name" 
        value={name}
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={handleReset}>Reset</button>
      <p 
        onMouseEnter={handleMouseEnter} 
        onMouseLeave={handleMouseLeave}
      >
        Hello, {name}
      </p>
      {submitted && <p>Form Submitted!</p>}
      <div style={{marginTop: "1rem", color: "gray"}}>
        {hoverStatus && <p>{hoverStatus}</p>}
        {keyStatus && <p>{keyStatus}</p>}
      </div>
    </form>
  );
}
`}
              onEvaluate={(transpiledCode) => {
                const messages = [];

                if (!transpiledCode.includes("useState")) {
                  messages.push("❌ Missing useState for managing state.");
                }

                if (!transpiledCode.includes("handleOnChange") || !transpiledCode.includes("setName(")) {
                  messages.push("❌ Use handleOnchange to update the name live with setName().");
                }

                if (!transpiledCode.includes("handleSubmit") || !transpiledCode.includes("e.preventDefault")) {
                  messages.push("❌ Use handleSubmit and preventDefault() to handle form submission properly.");
                }

                if (!transpiledCode.includes("handleReset") || !transpiledCode.includes("setName(") || !transpiledCode.includes("setSubmitted(false)")) {
                  messages.push("❌ Use handleReset, setName, and setSubmitted to handle form resetting properly.");
                }

                if (!transpiledCode.includes("onClick") || !transpiledCode.includes("handleReset")) {
                  messages.push("❌ Use onClick on a reset button to clear the input and reset state.");
                }

                if (
                  !transpiledCode.includes("handleMouseEnter") ||
                  !transpiledCode.includes("handleMouseLeave") ||
                  (
                    !transpiledCode.includes("setHoverStatus(")
                  )
                ) {
                  messages.push("❌ Use handleMouseEnter and handleMouseLeave and update with setting statements for hover behavior.");
                }

                if (!transpiledCode.includes("handleKeyDown") || !transpiledCode.includes('e.key === "Enter"') || !transpiledCode.includes("setKeyStatus(")) {
                  messages.push("❌ Use handleKeyDown to detect the Enter key being pressed.");
                }

                if (!transpiledCode.includes("submitted") || !transpiledCode.includes("Form Submitted")) {
                  messages.push("❌ Display a message like 'Form Submitted!' when the form is submitted.");
                }

                const passed = messages.length === 0;

                const message = passed
                  ? "✅ Awesome! You’ve correctly implemented all required event handlers and interactions."
                  : messages.join("\n");



                if (passed && typeof markCompleted === "function") {
                  markCompleted("eventHandlers"); // ✅ mark project as completed
                }

                try {
                  // Use Babel-transpiled code (should define and return a component like Profile)
                  const componentFunc = new Function("React", `${transpiledCode}; return Profile;`);
                  const component = React.createElement(componentFunc(React));
                  return { message, component };
                } catch (err) {
                  return { message: `❌ Code Error: ${err.message}`, component: null };
                }
              }}
              rootComponent="Profile"
            />
          </div>
        }
      </section>

      <section className="concept-section">
        <h2
          onClick={() => setShowModules((prev) => !prev)}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          {showModules ? "▼" : "▶"} 6. CSS Modules
        </h2>
        {showModules &&
          <p>yes</p>
        }
      </section>

      <section className="concept-section">
        <h2
          onClick={() => setShowFunctions((prev) => !prev)}
          style={{ cursor: "pointer", userSelect: "none" }}
        >
          {showFunctions ? "▼" : "▶"}6. Functions in React
        </h2>
        {showFunctions && (
          <p>Coming soon: Explore how functional components and hooks make React powerful and clean.</p>
        )}
      </section>
    </div>
  );
}
