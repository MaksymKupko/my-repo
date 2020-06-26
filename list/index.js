#!/usr/bin/env node

const fs = require("fs");
const util = require("util");
const chalk = require("chalk");
const path = require("path");

const targetDir = process.argv[2] || process.cwd();

//Method #2
// const lstat = util.promisify(fs.lstat);

//Method #3
const lstat = fs.promises.lstat;

// fs.readdir(process.cwd(), async (err, filenames) => {
//     if (err) {
//         console.log(err);
//     }

//     for (let filename of filenames) {
//         try {
//             const stats = await lstat(filename);
//             console.log(filename, stats.isFile());
//         } catch (err) {
//             console.log(err);
//         }
//     }
// });

//Method #1
// const lsatat = (filename) => {
//     return new Promise((resolve, reject) => {
//         fs.lstat(filename, (err, stats) => {
//             if (err) {
//                 reject(err);
//             }

//             resolve(stats);
//         });
//     });
// };

fs.readdir(targetDir, async (err, filenames) => {
    if (err) {
        console.log(err);
    }

    const allStats = await Promise.all(
        filenames.map((filename) => {
            return lstat(path.join(targetDir,filename));
        })
    );

    allStats.forEach((stats, index) => {
        if (stats.isFile()) {
            console.log(chalk.green(filenames[index]));
        } else {
            console.log(chalk.red(filenames[index]));
        }
    });
});
