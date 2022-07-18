let types = {
    media: ["mp4", "mkv"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    images: ['jpg']
}

let fs = require("fs");
let path = require("path");
// let obj = require("./")

function organiseFn(dirPath) {
    let destPath;
    // console.log("Organise command implemented for", dirPath);
    // 1. input -> directory path will be given
    if(dirPath == undefined) {
        destPath = process.cwd();
    } else {
        let doesExist = fs.existsSync(dirPath);
        if(doesExist) {
            // 2. create -> organise_file directory
            destPath = path.join(dirPath, "organised_files");
            if(!fs.existsSync(destPath)) {
                fs.mkdirSync(destPath);
            } 
        } else {
            console.log("Kindy enter the correct path.");
            return;
        }
    }

    // 3. identify categories of all the different files present in that input directory
    organiseHelper(dirPath, destPath);
}


function organiseHelper(src, dest) {
    // 3. identify categories of all the different files present in that input directory
    let childNames = fs.readdirSync(src);
    // console.log(childNames);
    for (let i = 0; i < childNames.length; i++) {
        childAddress = path.join(src, childNames[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile) {
            // console.log(childNames[i]);
            let category = getCategory(childNames[i]);
            console.log(childNames[i], "belongs to --> ", category);

            // 4. copy/cut files to that organised directory inside the corresponding category folder
            sendFiles(childAddress, dest, category);
        }
    }
}

function sendFiles(srcFilePath, dest, category) {
    let categorypath = path.join(dest, category);
    if(!fs.existsSync(categorypath)) {
        fs.mkdirSync(categorypath);
    }

    let fileName = path.basename(srcFilePath);
    destFilePath = path.join(categorypath, fileName);
    fs.copyFileSync(srcFilePath, destFilePath);
    fs.unlinkSync(srcFilePath);
    console.log(fileName, "copied to", category, "\n");
}


function getCategory(name) {
    let ext = path.extname(name);
    // console.log(ext);
    ext = ext.slice(1);
    for (const type in types) {
        let cTypeArr = types[type];
        for (let i = 0; i < cTypeArr.length; i++) {
            if(ext == cTypeArr[i]) {
                return type;
            }
        }
    }

    return "others";
}

module.exports = {
    organiseKey: organiseFn
}