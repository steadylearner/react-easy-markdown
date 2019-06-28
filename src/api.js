import { lexer, parser } from "marked";
import showdown from "showdown";

import { memoizeWith, identity } from "./ramda";

// memoizeWith only for pure functio
let html = (input = "") => {
  const test = parser(lexer(input));
  return test;
};

html = memoizeWith(identity, html);

let markdown = (input = "") => {
    const converter = new showdown.Converter();
    const result = converter.makeMarkdown(input);
    return result;
}

markdown = memoizeWith(identity, markdown);

// Use it for test only
const substitutePrefix = (href = "https://www.steadylearner.com") => (set = ["s-", "https://"]) => {
  const substituteItOrNot = href.startsWith(set[0])
  if (substituteItOrNot) {
    return `${set[1]}${href.split(set[0])[1]}`;
  } else {
    return href;
  }
}

// When render with React for each link inside MarkdownPreview.js
// Different from using regexes for useShortcut
let substitutePrefixes = (href = "https://www.steadylearner.com") => (set = [["s-", "https://"]]) => {
  const isHrefIncludeAnyPrefix = set.filter(x => href.startsWith(x[0]));

  if(isHrefIncludeAnyPrefix.length === 1) { // === i instead of > 0 to be more precise
    return `${isHrefIncludeAnyPrefix[0][1]}${href.split(isHrefIncludeAnyPrefix[0][0])[1]}`
  } else {
    return href;
  }
}

substitutePrefixes = memoizeWith(identity, substitutePrefixes);

// Test it and verify that it need exact match or others
// Use it for .md files made with this package.
// substituteWithRegex
// I lost original code for them and I don't want to complicate this package any more.

let reverseSet = (arrayOfArrays = [[]]) => {
  return arrayOfArrays.map(array => array.reverse());
};

reverseSet = memoizeWith(identity, reverseSet);

// useShorcut for markdown <a> tags
// They start with either : or (
let useShortcut = (set = [["s-", "https://"]]) => (draft = "") => {
  let text = draft;
  set.forEach(value => {
    // Build regexp for each value of set here
    let regex = new RegExp(`: ${value[0]}`, 'g');
    text = text.replace(regex, `: ${value[1]}`);
    regex = new RegExp(`\[(]` + value[0], 'g'); // ESLint shows '\[', but without it, tests don't pass
  //  regex = new RegExp(`(]` + value[0], 'g');
    text = text.replace(regex, "(" + value[1]);
  });
  return text;
};

// When use want to undo this use reverseSet for the same set

useShortcut = memoizeWith(identity, useShortcut);

let useRegex = (set = [
  [/<br\s*?>/gi, "\r\n"],
  [/&lt;/g, "<"],
  [/&gt;/g, ">"],
  [/&amp;/g, "&"],
]) => (draft = "") => {
  let text = draft;
  set.forEach(value => {
    text = text.replace(value[0], value[1]);
  });
  return text;
};

useRegex = memoizeWith(identity, useRegex);

function copy(
  value = "",
  fn = useRegex(),
) {
  const textField = document.createElement("textarea");

  textField.innerText = value;
  document.body.appendChild(textField);

  textField.value = fn(textField.innerHTML);

  textField.select(); // select copies html value
  document.execCommand("copy");
  textField.remove();
  return;
}

// Use your own function to what to do with the contents of local file
// e is mandatory
function readLocalFileWithHow(e = {}, fn = {}) { // (How -> How to use it)
  let file = e.target.files[0];

  if (!file) {
    return;
  }

  if (fn === {}) {
    return;
  }

  let reader = new FileReader();
  reader.onload = (e) => {
    let contents = e.target.result;
    // alert(contents);
    fn(contents);
  };
  reader.readAsText(file);
}

// Pass text value to save file and name if you want.
// For example, saveTextFromWeb("This is from your markdown editor.", "README.md")
function saveTextFromWeb(text = "", name = "README.md", type = "text/plain")
{
    let textToBlob = new Blob([text], {type});
    let blobURL = window.URL.createObjectURL(textToBlob);
    let fileName = name;

    let fileLink = document.createElement("a");

    fileLink.download = fileName;
    fileLink.innerHTML = "Save File from Web";
    fileLink.href = blobURL;
    fileLink.onclick = destroyClickedElement;
    fileLink.style.display = "none";
    document.body.appendChild(fileLink);

    fileLink.click();
}

function destroyClickedElement(event) {
  document.body.removeChild(event.target);
}

export {
  html,
  markdown,
  //
  substitutePrefix,
  substitutePrefixes,
  //
  useShortcut,
  useRegex,
  reverseSet,
  // Simple helper functions that you may need when you deal with markdown
  // Refer to www.steadylearner.com/markdown
  copy,
  //
  readLocalFileWithHow,
  saveTextFromWeb,
}

// [Markdown-Tutorial]: https://www.github.com.com/

// Test with this for substitute
// 1. [Start with Markdown-Tutorial][Markdown-Tutorial]
// 2. [Markdown CheatSheet](https://www.github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)
