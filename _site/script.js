// Requiring the module
const fs = require("fs");
let links = [
     ["convert-utf8-to-hex","convert utf8 to hex"],
     ["convert-hex-to-utf8","convert hex to utf8"],
     ["generate-random-hex-numbers","generate random hex numbers"],
     ["shuffle-hex-digits","shuffle hex digits"],
     ["rotate-hex-digits","rotate hex digits"],
     ["reverse-hex-digits","reverse hex digits"],
     ["convert-hex-to-image","convert hex to image"],
     ["convert-hex-to-roman-numeral","convert hex to roman numeral"],
     ["convert-roman-numeral-to-hex","convert roman numeral to hex"],
     ["convert-hex-to-decimal","convert hex to decimal"],
     ["convert-decimal-to-hex","convert decimal to hex"],
     ["convert-hex-to-octal","convert hex to octal"],
     ["convert-octal-to-hex","convert octal to hex"],
     ["convert-hex-to-binary","convert hex to binary"],
     ["convert-binary-to-hex","convert binary to hex"],
     ["convert-string-to-hex","convert string to hex"],
     ["convert-hex-to-string","convert hex to string"],
     ["convert-ip-to-hex","convert ip to hex"],
     ["convert-hex-to-ip","convert hex to ip"],  
];
for (let i = 0; i < links.length; i++) {
  const dataToGenerate = {
    Language: "English",
    htmlLangAtt: "en",
    H1: links[i][1],
    H2: "",
    nofileupload: true,
    variant: "primary",
    TITLE: "",
    META: "",
    LABEL: "",
    BREADCRUMB_LABEL: "",
    color: "blue",
    TEXTUAL_CONTENT: [
      {
        priority: 1,
        logoUrl: "/assets/images/lightbulb.svg",
        header: "",
        content: "",
      },
      {
        priority: 1,
        logoUrl: "/assets/images/target.svg",
        header: "",
        content: "",
      },
      {
        priority: 1,
        logoUrl: "/assets/images/cross.svg",
        header: "",
        content: "",
      },
      {
        priority: 1,
        logoUrl: "/assets/images/shield.svg",
        header: "",
        content: "",
      },
      {
        priority: 1,
        logoUrl: "/assets/images/fast.svg",
        header: "",
        content: "",
      },
      {
        priority: 1,
        logoUrl: "/assets/images/cloud_new.svg",
        header: "",
        content: "",
      },
    ],
    FAQ: [
      {
        question: "",
        answer: "",
      },
    ],
    csscdns: ['<link rel="stylesheet" href="/assets/css/style.css"/>'],
    jsfilepaths: [
      "/assets/js/common.js",
      `/assets/js/${links[i][0]}.js`,
    ],
  };

  const htmlfile = `${links[i][0]}.json`;
  fs.writeFileSync(
    "./_data/feature/en/" + htmlfile,
    JSON.stringify(dataToGenerate)
  );
var mdFileData = `---
layout: feature
folderName: feature
lang: en
fileName: ${links[i][0]}
permalink: /${links[i][0]}
tool: ${links[i][0]}
noBox: true
---

{%- include ${links[i][0]}.html -%}
`;
fs.writeFileSync(`./feature/${links[i][0]}.md`, mdFileData);
fs.writeFileSync(`./assets/js/${links[i][0]}.js`, `First_call();
function generate(options, cb) {
  
}`);
fs.writeFileSync(`./_includes/${links[i][0]}.html`, '');
}
