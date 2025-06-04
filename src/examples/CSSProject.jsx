import { useState, useEffect } from "react";
import * as Babel from "@babel/standalone";
import React from "react";

export default function CSSProject({
    projectId,
    prompt,
    jsxCodeDefault,
    cssCodeDefault,
    hint,
    answerJSX,
    answerCSS,
    onEvaluate,
    rootComponent,
    markCompleted,
}) {
    const [jsxCode, setJsxCode] = useState(jsxCodeDefault);
    const [cssCode, setCssCode] = useState(cssCodeDefault);
    const [renderedComponent, setRenderedComponent] = useState(null);
    const [outputMessage, setOutputMessage] = useState("");
    const [error, setError] = useState("");
    const [showHint, setShowHint] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (showAnswer && answerCSS) {
            injectCSS(answerCSS);
        }
    }, [showAnswer, answerCSS]);

    const injectCSS = (code) => {
        let styleTag = document.getElementById("user-css");
        if (!styleTag) {
            styleTag = document.createElement("style");
            styleTag.id = "user-css";
            document.head.appendChild(styleTag);
        }
        styleTag.innerHTML = code;
    };

    const transpileCode = () => {
        try {
            const transformedCode = Babel.transform(jsxCode, {
                presets: ["react", "env"],
            }).code;
            return transformedCode;
        } catch (e) {
            setError(e.message);
            return null;
        }
    };

    const handleRun = () => {
        setError("");
        setOutputMessage("");

        const transpiled = transpileCode();
        if (!transpiled) return;

        // 🔧 Ensure the latest CSS is injected before rendering
        injectCSS(cssCode);

        try {
            const result = onEvaluate(transpiled, cssCode);

            if (typeof result === "object" && result.message !== undefined) {
                setOutputMessage(result.message);
                if (result.message.includes("✅") || result.passed) {
                    setCanSubmit(true);
                }

                try {
                    const componentFunc = new Function("React", `${transpiled}; return ${rootComponent};`)(React);
                    const component = React.createElement(componentFunc);
                    setRenderedComponent(component);
                } catch (evalErr) {
                    setError("⚠️ Runtime Error: " + evalErr.message);
                    setRenderedComponent(null);
                }
            } else {
                setOutputMessage(result);
                setRenderedComponent(null);
            }
        } catch (err) {
            setError("⚠️ Execution Error: " + err.message);
            setRenderedComponent(null);
        }
    };


    const handleKeyDown = (e, code, setCode) => {
        if (e.key === "Tab") {
            e.preventDefault();
            const textarea = e.target;
            const { selectionStart, selectionEnd } = textarea;
            const newCode = code.substring(0, selectionStart) + "  " + code.substring(selectionEnd);
            setCode(newCode);

            requestAnimationFrame(() => {
                textarea.selectionStart = textarea.selectionEnd = selectionStart + 2;
            });
        }
    };


    return (
        <div className="code-practice">
            <h3
                style={{
                    textAlign: "center",
                    padding: "1rem 2rem",
                    backgroundColor: "#FFFFA0",
                    color: "#333",
                    borderRadius: "12px",
                    width: "fit-content",
                    margin: "1rem auto",
                    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)"
                }}
            >
                <strong>{projectId} Project</strong>
            </h3>

            <p><strong>Prompt:</strong> {prompt}</p>

            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
                <div style={{ flex: 1 }}>
                    <h4>🧩 JSX File (e.g., MyComponent.jsx)</h4>
                    <textarea
                        rows={20}
                        value={jsxCode}
                        onChange={(e) => setJsxCode(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, jsxCode, setJsxCode)}
                        style={{ width: "100%", fontFamily: "monospace", fontSize: "14px" }}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <h4>🎨 CSS Module File (e.g., MyComponent.module.css)</h4>
                    <textarea
                        rows={20}
                        value={cssCode}
                        onChange={(e) => setCssCode(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, cssCode, setCssCode)}
                        style={{ width: "100%", fontFamily: "monospace", fontSize: "14px" }}
                    />
                </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={handleRun}>Run</button>
                {canSubmit && !submitted && (
                    <button
                        onClick={() => {
                            markCompleted?.(projectId);
                            setSubmitted(true);
                            setOutputMessage("🎉 Project submitted and marked complete!");
                        }}
                        style={{ backgroundColor: "#28a745", color: "white" }}
                    >
                        Submit
                    </button>
                )}
                <button onClick={() => setShowHint(!showHint)}>
                    {showHint ? "Hide Hint" : "Show Hint"}
                </button>
                <button onClick={() => setShowAnswer(!showAnswer)}>
                    {showAnswer ? "Hide Answer" : "Show Answer"}
                </button>
            </div>

            <pre style={{ background: "#f3f3f3", padding: "0.5em", marginTop: "1rem" }}>
                {outputMessage}
            </pre>

            {error && <pre style={{ color: "red" }}>{error}</pre>}

            {showHint && hint && (
                <div style={{ background: "#fff8dc", padding: "0.5em", marginTop: "0.5rem" }}>
                    💡 <strong>Hint{Array.isArray(hint) && hint.length > 1 ? "s" : ""}:</strong>
                    <ul style={{ paddingLeft: "1.2rem", marginTop: "0.3rem" }}>
                        {(Array.isArray(hint) ? hint : [hint]).map((h, i) => (
                            <li key={i}>{h}</li>
                        ))}
                    </ul>
                </div>
            )}

            {showAnswer && (
                <div style={{ marginTop: "1rem", background: "#e6ffed", padding: "0.5rem" }}>
                    <h4>✅ JSX Answer:</h4>
                    <pre>{answerJSX}</pre>
                    <h4>✅ CSS Answer:</h4>
                    <pre>{answerCSS}</pre>
                </div>
            )}

            <div style={{ marginTop: "1rem", border: "1px dashed #ccc", padding: "1rem" }}>
                <strong>Live Output:</strong>
                <div>{renderedComponent}</div>
            </div>
        </div>
    );
}
