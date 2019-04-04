<!-- What I have to do later -->
<!--
  1. Update outdated packages and write your own package.json
  2. Organize folder structure to use Jest and Enzyme 
  3. Write some tests
  4. Include real example from https://www.steadylearner.com/markdown
-->

<!-- Shortcut -->

[react-marked-markdown]: https://github.com/Vincent-P/react-marked-markdown
[React Easy Markdown Github Repository]: https://github.com/steadylearner/react-easy-md
[Codesandbox for react-easy-md]: https://codesandbox.io/s/wz9pp1xpn8
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
3. The modules used here were written with **class** and I am thinking of turning them into functional components later.
(I modified them to be functional components to be more compatible with current **React** development trend but it didn't work well. Only to learn that ref can't be used with functional components and it is not easy to make functional components when class components have it.)
4. LiveMarkdownEditor is removed from the package to reduce package size and example codes from [Markdown Editor Page][Markdown] from [Steadylearner][Steadylearner] will replace its role later. 

The original Github repository is archived so I made this package to share the code from the former repository with some improvments. 

The name of package became "react-easy-md" for the NPM Package didn't allow "React Easy Markdown" for similarity.
You may think that React Easy Mardkdown refer to `react-easy-md` in this documentation.

For [Steadylearner][Steadylearner] uses markdown intensively, it may include more features later with examples and tests.

## Install

1. Type `$npm install --save react-easy-md` or `$yarn add react-easy-md` in your **CLI**
2. Import component(s) you want
```js
import { MarkdownPreviw, MarkdownInput } from 'react-easy-md';
```
3. If you use **webpack** and see some warnings and errors with this package, you may include
```js
// Refer to webpack.config.js at
// https://github.com/steadylearner/react-easy-md/blob/master/examples/config/webpack.config.js

// Errors in developement
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
// For production, use it instead of uglifyjsplugin
const TerserPlugin = require('terser-webpack-plugin'); //

moudle.exports = () => {
  return({
    module: {
      
      node: {
	fs: "empty",
	tls: "empty",
	net: "empty",
	child_process: "empty",
      },
 
      optimization: {
        minimizer: [
          new TerserPlugin({

	  }),
	],
      }

      // To remove warning from 'jsdom' used inside react-easy-md 
      plugins: [
        new FilterWarningsPlugin({
	  exclude: /Critical dependency: the request of a dependency is an expression/,
	})
      ]

      
    }
  })
}

```

## Example

You may read [How to enable code syntax highlight in React App] if you want to use many code snippets inside your app or visit [react-marked-markdown][react-marked-markdown] for more information.

Every props used here is optional but it will be a starting point for your app. You can use **CSS files in example folder** at [React Easy Markdown Github Repository][React Easy Markdown Github Repository].
 
```js
// index.js
import React from "react";
import ReactDOM from "react-dom";

import { MarkdownPreview } from "react-easy-md";

function App() {
  return (
    <section className="App">
      <MarkdownPreview
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

With ReactMarkdown from react-easy-md, **you don't have to type the entire paths anymore**. It helps you **not to repeat what you know they will do**.

## What is Next?

1. More features **to help you write less markdown** with React
2. Examples similar to [Steadylearner Markdown Editor Page][markdown] and other pages at [Steadylearner][Steadylearner]
3. Update the package to use latest dependencies and test it with **Jest**
4. **Tests and examples**

## Read More

1. [Steadylearner Blog Posts for examples][blog]
2. [prop-passer to help you write less prop and className][prop-passer]

## Where to learn and use markdown?

 [Markdown-Tutorial]: https://www.markdowntutorial.com/

 1. [Start with Markdown-Tutorial][Markdown-Tutorial]
 2. [Markdown CheatSheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
 3. [Use mark down for Github page](https://help.github.com/articles/getting-started-with-writing-and-formatting-on-github/)
 4. [Learn Markdown in X Minutes](https://learnxinyminutes.com/docs/markdown)
 5. [Example to make Github README.md File](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)
 6. [Steadylearner Markdown Live Editor][markdown]
 7. [Markdown to html](https://markdowntohtml.com/)
 8. [Markdown Interpreter](https://dillinger.io/)

