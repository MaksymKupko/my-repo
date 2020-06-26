#!/usr/bin/env node

const chokidar = require("chokidar");

snail = function (array) {
    const result = [];

    let rowMin = 0;
    let rowMax = array.length - 1;
    let colMin = 0;
    let colMax = array.length - 1;
    let colCurr = 0;
    let rowCurr = 0;

    while (rowMax >= rowMin && colMax >= colMin) {
        while (colCurr >= colMin && colCurr <= colMax) {
            result.push(array[rowCurr][colCurr]);
            colCurr++;
        }
        rowMin++;

        rowCurr++;
        while (rowCurr >= rowMin && rowCurr <= rowMax) {
            result.push(array[rowCurr][colCurr]);
            rowCurr++;
        }
        colMax--;

        colCurr--;
        while (colCurr >= colMin && colCurr <= colMax) {
            result.push(array[rowCurr][colCurr]);
            colCurr--;
        }
        rowMax--;

        rowCurr--;
        while (rowCurr >= rowMin && rowCurr <= rowMax) {
            result.push(array[rowCurr][colCurr]);
            rowCurr--;
        }
        colMax--;
    }
    return result;
};
