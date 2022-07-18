let fs = require("fs");
let path = require("path");

function treeFn(dirPath) {
    // console.log("Tree command implemented for", dirPath);
    if(dirPath == undefined) {
        treeHelper(process.cwd(), "");
        return;
    } else {
        let doesExist = fs.existsSync(dirPath);
        if(doesExist) {
            treeHelper(dirPath, "");
        } else {
            console.log("Kindy enter the correct path.");
            return;
        }
    }
}


function treeHelper(dirPath, indent) {
    let isFile = fs.lstatSync(dirPath).isFile();
    if(isFile) {
        let fileName = path.basename(dirPath);
        console.log(indent + "├──" + fileName);
    } else {
        let dirName = path.basename(dirPath);
        console.log(indent + "└──" + dirName);
        let children = fs.readdirSync(dirPath);
        children.forEach(child => {
            let childPath = path.join(dirPath, child);
            treeHelper(childPath, indent + "\t");
        });
    }
}

module.exports = {
    treeKey: treeFn
}