const fs = require("fs");
const path = require("path");

const dirs = ["dist/server", "dist/common"];

function scanDir(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.log(err.message);
            return;
        }
        for (const file of files) {
            const filepath = path.join(dir, file);
            if (fs.lstatSync(filepath).isDirectory()) {
                scanDir(filepath);
                continue;
            }
            fs.readFile(filepath, (err, data) => {
                if (err) {
                    console.log(err.message);
                    return;
                }
                const str = data.toString().replace(/require\("(\..*)"\)/g, "require(\"$1.js\")");
                fs.writeFile(filepath, str, (err) => {
                    if (err) {
                        console.log(err.message);
                        return;
                    }
                });
            });
        }
    });
}

for (const dir of dirs) {
    scanDir(dir);
}
