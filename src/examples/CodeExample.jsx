export default function CodeExample({ code }) {

    return (
        <div className="code-example"
            style={{
                background: "#f3f3f3", padding: "1em", border: "10px solid #FFFFA0",
                borderRadius: ".5rem", margin: "10px"
            }}>
            <pre><code>{code}</code></pre>
        </div>
    )

}