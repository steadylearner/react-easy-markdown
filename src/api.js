import { lexer, parser } from "marked";
import showdown from "showdown";

function markdown(input = "") {
    const converter = new showdown.Converter();
    const result = converter.makeMarkdown(input);
    return result;
}

function substitutePrefixes(
  href = "https://www.steadylearner.com",
  prefixesWithReplacements = [
    ["s-", "https://"],
  ],
) {
  const isHrefIncludeAnyPrefix = prefixesWithReplacements.filter(x => href.startsWith(x[0]));

  if(isHrefIncludeAnyPrefix.length === 1) { // === i instead of > 0 to be more precise
    return `${isHrefIncludeAnyPrefix[0][1]}${href.split(isHrefIncludeAnyPrefix[0][0])[1]}`
  } else {
    return href;
  }
}

function html(input = "") {
  const test = parser(lexer(input));
  return test;
}

function copy(value = "") { // copyToClipboardWithCode
  const textField = document.createElement("textarea");
  const brRegex = /<br\s*?>/gi;
  // const brRegex = /<br\s*[\/]?>/gi;

  const leftHTMLrapperRegex = /&lt;/g;
  const rightHTMLWrapperRegex = /&gt;/g;

  // 1.
  textField.innerText = value;
  // 2.
  document.body.appendChild(textField);

  // 3.

  textField.value = textField.innerHTML
    .replace(brRegex, "\r\n")
    .replace(leftHTMLrapperRegex, "<")
    .replace(rightHTMLWrapperRegex, ">");

  // 4.

  textField.select(); // select copies html value
  document.execCommand("copy");
  textField.remove();
}

// Use your own function to what to do with the contents of local file
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
      fn(contents);
  };
  reader.readAsText(file);
}

// inside class
// readLocalFile(e) {
//     let file = e.target.files[0];

//     if (!file) {
//         return;
//     }

//     let reader = new FileReader();
//     reader.onload = (e) => {
//         let contents = e.target.result;
//         this.setState({
//             value: contents,
//         });
//     };
//     reader.readAsText(file);
// }

// Pass text value to save file and name if you want. 
// For example, saveTextFromWeb("This is from your markdown editor.", "README.md")
function saveTextFromWeb(text = "", name = "post.md", type = "text/plain") 
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

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}

export {
  html,
  markdown,
  
  // Simple helper functions that you may need when you deal with markdown
  // Refer to www.steadylearner.com/markdown 
  copy,
  substitutePrefixes,
  readLocalFileWithHow,
  saveTextFromWeb,
}
