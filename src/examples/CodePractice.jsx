import { useState } from "react";
import prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";
import * as Babel from "@babel/standalone";

export default function CodePractice({ prompt, defaultCode, hint, answer, onEvaluate }) {
    const [code, setCode] = useState(defaultCode);
    const [output, setOutput] = useState("");
    const [error, setError] = useState("");
    const [hasAttempted, setHasAttempted] = useState(false);
    const [showHint, setShowHint] = useState(false);
    const [showAnswer, setShowAnswer] = useState(false);

    const handleRun = () => {
        setError("");
        try {
            const result = onEvaluate(code);
            setOutput(result);
        } catch (err) {
            setError("⚠️ Error: " + err.message);
        }
        setHasAttempted(true);
    };

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
        </div>
    );
}

