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
            <li>📦 Components are reusable and should stay focused on one thing.</li>
            <li>🔄 Props are read-only, while state can change over time.</li>
            <li>🔁 useEffect is your go-to tool for handling side effects like fetching data or setting timers.</li>
            <li>🔧 Keep UI logic and business logic separated to keep components clean.</li>
            <li>🧠 Think in terms of "data flows down" — parent components pass data to children via props.</li>
          </ul>
        </div>
      </section>

      <section className="concept-section">
        <h2>1. JSX</h2>
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

      {/* Upcoming Sections */}
      <section className="concept-section">
        <h2>4. Syntax</h2>
        <p>Coming soon: Learn how modern JavaScript syntax (ES6+) powers your React components.</p>
      </section>

      <section className="concept-section">
        <h2>5. Functions in React</h2>
        <p>Coming soon: Explore how functional components and hooks make React powerful and clean.</p>
      </section>
    </div>
  );
}
