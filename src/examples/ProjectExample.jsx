import { useState } from "react";
import * as Babel from "@babel/standalone";
import React from "react";

export default function ProjectPractice({projectId, prompt, extraContent, defaultCode, hint, answer, onEvaluate }) {
    const [code, setCode] = useState(defaultCode);
    const [output, setOutput] = useState("");
    const [renderedComponent, setRenderedComponent] = useState(null);
    const [outputMessage, setOutputMessage] = useState("");
    const [error, setError] = useState("");
    const [hasAttempted, setHasAttempted] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    const transpileCode = () => {
        try {
            const transformedCode = Babel.transform(code, {
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

        if (!transpiled) {
            // Don't proceed if transpiling failed
            return;
        }

        try {
            const result = onEvaluate(transpiled);

            if (typeof result === "object" && result.message !== undefined) {
                setOutputMessage(result.message);

                try {
                    // Dynamically create component
                    const componentFunc = new Function("React", `${transpiled}; return Profile;`)(React);
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

        setHasAttempted(true);
    };



    const handleKeyDown = (e) => {
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

    // const handlePrettify = () => {
    //     try {
    //         const formatted = window.prettier.format(code, {
    //             parser: "babel",
    //             plugins: window.prettierPlugins,
    //             semi: true,
    //             singleQuote: true,
    //             jsxSingleQuote: false,
    //         });

    //         setCode(formatted);
    //     } catch (err) {
    //         setOutput("⚠️ Could not prettify code: " + err.message);
    //     }
    // };

    return (
        <div className="code-practice">
            <p><strong>This a project '{projectId}'!</strong></p>
            <p><strong>Prompt: </strong>{prompt}</p>
            {extraContent}
            <textarea
                rows={25}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{ width: "100%", fontFamily: "monospace", fontSize: "14px" }}
            />
            <div style={{ display: "flex", gap: "10px", marginTop: "0.5rem" }}>
                <button onClick={handleRun}>Run</button>
                {hasAttempted && (
                    <>
                        <button onClick={() => setShowHint(!showHint)}>
                            {showHint ? "Hide Hint" : "Show Hint"}
                        </button>
                        <button onClick={() => setShowAnswer(!showAnswer)}>
                            {showAnswer ? "Hide Answer" : "Show Answer"}
                        </button>
                    </>
                )}
            </div>
            <pre style={{ background: "#f3f3f3", padding: "0.5em" }}>{outputMessage}</pre>
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

            {showAnswer && answer && (
                <pre
                    style={{
                        background: "#e6ffed",
                        padding: "0.5em",
                        marginTop: "0.5rem",
                        border: "1px solid #b5e2c0",
                    }}
                >
                    ✅ <strong>Answer:</strong>
                    {"\n"}
                    {answer}
                </pre>
            )}

            {error && <pre style={{ color: "red", marginTop: "1rem" }}>{error}</pre>}
            <div style={{ marginTop: "1rem", border: "1px dashed #ccc", padding: "1rem" }}>
                <strong>Live Output:</strong>
                <div>{renderedComponent}</div>
            </div>
        </div>
    );
}
