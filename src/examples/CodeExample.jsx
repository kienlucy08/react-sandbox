import { useState } from "react";
import prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";

export default function CodePractice({ prompt, defaultCode, hint, answer, onEvaluate }) {
    const [code, setCode] = useState(defaultCode);
    const [output, setOutput] = useState("");
    const [hasAttempted, setHasAttempted] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleRun = () => {
        try {
            const result = onEvaluate(code);
            setOutput(result);
        } catch (err) {
            setOutput("⚠️ Error: " + err.message);
        }
        setHasAttempted(true);
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
            <p>{prompt}</p>
            <textarea
                rows={8}
                value={code}
                onChange={(e) => setCode(e.target.value)}
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
            <pre style={{ background: "#f3f3f3", padding: "0.5em" }}>{output}</pre>
            {showHint && hint && (
                <div style={{ background: "#fff8dc", padding: "0.5em", marginTop: "0.5rem" }}>
                    💡 <strong>Hint:</strong> {hint}
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
        </div>
    );
}

