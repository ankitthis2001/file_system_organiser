#!/usr/bin/env node

let fs = require("fs");
let path = require("path");
let helpObj = require("./commands/help");
let treeObj = require("./commands/tree");
let organiseObj = require("./commands/organise");

// let inputArr = process.argv;
let inputArr = process.argv.slice(2);
// console.log(inputArr);

let command = inputArr[0];
let directoryPath = inputArr[1];

let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', 'xz'],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odf', 'txt', 'ps', 'tex', 'pptx'],
    app: ['exe', 'dmg', 'pkg', 'deb'],
    image: ['jpg', 'jpeg', 'png', 'gif']
}

switch (command) {
    case "tree":
        treeObj.treeKey(directoryPath);
        break;
    case "organise":
        organiseObj.organiseKey(directoryPath);
        break;

    case "help":
        helpObj.helpKey();
        break;

    default:
        console.log("Please 🙏 Input Right Command!");
        break;
}


