import { useState } from "react";
import prettier from "prettier/standalone";
import parserBabel from "prettier/plugins/babel";

export default function CodePractice({ prompt, defaultCode, onEvaluate }) {
    const [code, setCode] = useState(defaultCode);
    const [output, setOutput] = useState("");

    const handleRun = () => {
        try {
            const result = onEvaluate(code);
            setOutput(result);
        } catch (err) {
            setOutput("⚠️ Error: " + err.message);
        }
    };

    const handlePrettify = () => {
        try {
            const formatted = window.prettier.format(code, {
                parser: "babel",
                plugins: window.prettierPlugins,
                semi: true,
                singleQuote: true,
                jsxSingleQuote: false,
            });

            setCode(formatted);
        } catch (err) {
            setOutput("⚠️ Could not prettify code: " + err.message);
        }
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
                <button onClick={handlePrettify}>Prettify</button>
            </div>
            <pre style={{ background: "#f3f3f3", padding: "0.5em" }}>{output}</pre>
        </div>
    );
}

