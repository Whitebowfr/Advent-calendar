var data = require("./data").days.five

/**
 * A function which converts a boarding pass to a JSON Object containing the data of the pass
 * @param {pass} str 
 * @returns {seatData}
 */
function codeToJSON(str) {
    let row = binaryToDec(str.match(/(F|B){7}/g)[0]
                    .replaceAll("F", "0")
                    .replaceAll("B", "1"))
    let column = binaryToDec(str.match(/(L|R){3}/g)[0]
                    .replaceAll("L", "0")
                    .replaceAll("R", "1"))
    return {
        row: row,
        col: column,
        id: row * 8 + column
    }
}

/**
 * A simple function to convert a binary string to an integer
 * @param {string} bin
 * @returns {Int}
 */
function binaryToDec(bin) {
    bin.split("")
    let result = 0
    for (let i = bin.length - 1; i >= 0; i--) {
        if (bin[i] == 1) 
        result += 2**(bin.length-i-1)
    }
    return result
}

/* This is for the first part
let highest = 0

data.split("\n").forEach(pass => {
    let cur = codeToJSON(pass).id
    highest = (cur > highest ? cur : highest)
});

console.log(highest)*/

//This is for the second part
let ids = [];
data.split("\n").forEach(boardingPass => {
    ids.push(codeToJSON(boardingPass).id)
})

ids.sort()

let previousId = -1
ids.forEach(id => {
    if (id - previousId == 2) {
        console.log(id - 1)
    }
    previousId = id
})

/**
 * A string containing the boarding pass number.
 * @typedef {string} pass syntax : "xxxxxxxYYY" with "x" being either F or B and "Y" being either L or R
 */
/**
 * The complete data of a seat
 * @typedef {Object} seatData
 * @property {Int} row
 * @property {Int} col
 * @property {Int} id Is equal to the row * 8 + the column number
 */