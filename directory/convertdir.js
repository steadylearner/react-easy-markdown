const path = require('path');
const { readdir: read, readFile, writeFile, copyFile, mkdir: makedir } = require('fs');

const substitute = (set = [["s-", "https://"]]) => (draft = "") => {
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

// Use your own set instead
const set = [
  ["s-", "https://www.steadylearner.com"],
  ["n-", "https://www.npmjs.com"],
];

//

const param = process.argv.slice(2);

const before = param[0] || "posts";
const after = param[1] || "GitHub";

// $node convertdir.js <withshorcut> <withoutshortcut>;
// $node convertdir.js posts GitHub
// $node convertdir.js posts posts_c

//joining path of directory
const directoryPath = path.join(__dirname, before);
const compareDirectoryPath = `${__dirname}/${after}`;

makedir(compareDirectoryPath, { recursive: true }, (err) => {
   if (err) throw err;
});

read(directoryPath, function (err, files) {
   if (err) throw err;

   console.log(`\n${files.length} posts will be converted.\n`)

   files.forEach(function (file) {
      // Do whatever you want to do with the file
      // console.log(file); // show file names

      // copyFile(`${directoryPath}/${file}`, `${compareDirectoryPath}/${file}`, (err) => {
      //    if (err) {
      //       throw err;
      //    }
      // });

      readFile(`${directoryPath}/${file}`, 'utf8', (err, data) => {
         if (err) {
            throw err;
         }
         console.log("Before: ", data);
         const substituted = substitute(set)(data);
         console.log("After: ", substituted);

         const draft = new Uint8Array(Buffer.from(substituted));

         writeFile(`${compareDirectoryPath}/${file}`, draft, 'utf8', (err) => {
            if (err) {
               throw err;
            }
         });
      });
   });
});
