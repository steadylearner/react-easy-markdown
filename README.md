<!-- Shortcut -->

[react-marked-markdown]: https://github.com/Vincent-P/react-marked-markdown
[React Easy Markdown Github Repository]: https://github.com/steadylearner/react-easy-markdown
[Codesandbox for react-easy-markdown]: https://codesandbox.io/s/wz9pp1xpn8
[How to enable code syntax highlight in React App]: https://medium.com/@steadylearner/how-to-enable-code-syntax-highlight-in-react-app-38463498fa6e
[How to write less code for links in markdown with React]: https://www.steadylearner.com/blog/read/How-to-write-less-code-for-links-in-markdown-with-React

<!-- \Shortcut -->

<!-- Steadylearner -->

[Steadylearner]: https://www.steadylearner.com/
[Blog]: https://www.steadylearner.com/blog
[Markdown]: https://www.steadylearner.com/markdown
[prop-passer]: https://www.npmjs.com/package/prop-passer

<!-- \Steadylearner -->

# React Easy Markdown

Some React components to help you write markdown with ease.

---

The code used here is mainly from [react-marked-markdown][react-marked-markdown].

But the differences are 

1. It solved the problem of showing `null` title. 
2. `prefixAndReplacement` prop is included to help you write shortcuts for `<a>` inside markdown.
3. The modules used here were written with **class**. They became **functional components** to be more compatible with current **React** development trend.

The original Github repository is archived so I made this package to share the code from the former repository with some improvments. 

For [Steadylearner][Steadylearner] uses markdown intensively, it may include more features later. 

## Install

1. Type `$npm install --save react-easy-markdown` or `$yarn add react-easy-markdown` in your **CLI**
2. Import component(s) you want
```js
import ReactMarkdown, { ReactMarkdownInput } from 'react-easy-markdown';
```

## Example

You may read [How to enable code syntax highlight in React App] if you want to use many code snippets inside your app or visit [react-marked-markdown][react-marked-markdown] for more information.

Every props used here is optional but it will be a starting point for your app. You can use **CSS files in example folder** at [React Easy Markdown Github Repository][React Easy Markdown Github Repository].
 
```js
// index.js
import React from "react";
import ReactDOM from "react-dom";

import ReactMarkdown from "react-easy-markdown";

function App() {
  return (
    <section className="App">
      <ReactMarkdown
        // Refer to www.steadylearner.com/markdown page
        // value={test} // Comment it to show default value
        markedOptions={{
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

```

## API

1. You can refer to [react-marked-markdown][react-marked-markdown] first for this is just the improved version of it.
2. To understand **prefixWithReplacement** better, please visit [How to write less code for links in markdown with React][How to write less code for links in markdown with React].

### Usage of prefixWithReplacement

The part of the code snippet from the example above
```jsx
prefixWithReplacement={[
  ["s-", "https://www.steadlyearner.com"],
  ["l-", "https://www.linkedin.com/in"],
  ["y-", "https://www.youtube.com/channel/"],
  ["t-", "https://twitter.com/"],
  ["g-", "https://www.github.com"]
]} 
```

We pass various **prefixes** with **its replacements** with data type **array of arrays**.

Then, Inside `ReactMarkdown` module it will convert 
```md
[Blog](s-/blog)
[LinkedIn](l-/steady-learner-3151b7164)
[YouTube](y-/UCt_jsJOe91EVjd58kHpgTfw)
[Twittter](t-/steadylearner_p)
[Github](g-/steadylearner)
```

equal to

```md
[Blog](https://www.steadylearner.com/blog)
[LinkedIn](https://www.linkedin.com/in/steady-learner-3151b7164/)
[YouTube](https://www.youtube.com/channel/UCt_jsJOe91EVjd58kHpgTfw)
[Twittter](https://twitter.com/steadylearner_p)
[Github](https://github.com/steadylearner)
```

With ReactMarkdown from react-easy-markdown, **you don't have to type the entire paths anymore**. It helps you **not to repeat what you know they will do** with some help from programming.

## What is Next?

1. More features **to help you write less markdown** with React
2. Examples similar to [Steadylearner Markdown Editor Page][markdown] and other pages at [Steadylearner][Steadylearner]
3. **Tests with React**

## Read More

1. [Steadylearner Blog Posts for examples][blog]
2. [Steadylearner Markdown Editor Page][markdown]
3. [prop-passer to help you write less prop and className][prop-passer]

