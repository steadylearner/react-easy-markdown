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
  const isHrefeIncludeAnyPrefix = prefixesWithReplacements.filter(x => href.startsWith(x[0]));

  if(isHrefeIncludeAnyPrefix.length === 1) { // === i instead of > 0 to be more precise
    return `${isHrefeIncludeAnyPrefix[0][1]}${href.split(isHrefeIncludeAnyPrefix[0][0])[1]}`
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

export {
  html,
  markdown,
  copy,
  substitutePrefixes,
}
