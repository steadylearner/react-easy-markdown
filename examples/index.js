// After you install react-md with yarn or npm

import React from "react";
import ReactDOM from "react-dom";

// Refer to www.steadylearner.com/markdown page
import ReactMarkdown from "react-easy-markdown";

function App() {
  return (
    <section className="App"
      <ReactMarkdown
        // value={test} // Comment it to show default value
        markedOptions={{
          // Read https://medium.com/@steadylearner/how-to-enable-code-syntax-highlight-in-react-app-38463498fa6e
          langPrefix: "hljs ", // hljs prefix hljs relevant classes for styling
          sanitize: false, // allow html
          breaks: true
        }}
        prefixWithReplacement={[
          ["s-", "https://www.steadlyearner.com"],
          ["l-", "https://www.linkedin.com/in"],
          ["y-", "https://www.youtube.com/channel/"],
          ["t-", "https://twitter.com/"],
          ["g-", "https://www.github.com"]
        ]} // it can be plural or singular
      />
    </section>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
