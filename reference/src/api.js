import { lexer, parser } from "marked";

const substitutePrefixes = (
  href = "https://www.steadylearner.com",
  prefixesWithReplacements = [
    ["s-", "https://"],
  ],
) => {
  const isHrefeIncludeAnyPrefix = prefixesWithReplacements.filter(x => href.startsWith(x[0]));

  if(isHrefeIncludeAnyPrefix.length === 1) { // === i instead of > 0 to be more precise
    return `${isHrefeIncludeAnyPrefix[0][1]}${href.split(isHrefeIncludeAnyPrefix[0][0])[1]}`
  } else {
    return href;
  }
}

const html = (input = "") => {
  const HTML = parser(lexer(input));
  return HTML;
}

const copy = (value = "") => { // copyToClipboardWithCode
  const textField = document.createElement("textarea");
  const brRegex = /<br\s*[\/]?>/gi;

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
  copy,
  substitutePrefixes,
}



