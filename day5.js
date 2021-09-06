var data = require("./data").days.five

// A function which converts a boarding pass to a JSON Object containing the data of the pass
function codeToJSON(str) {
    let row = parseInt(str.match(/(F|B){7}/g)[0]
                    .replaceAll("F", "0")
                    .replaceAll("B", "1"), 2)
    let column = parseInt(str.match(/(L|R){3}/g)[0]
                    .replaceAll("L", "0")
                    .replaceAll("R", "1"), 2)
    return row * 8 + column
}

function getHighestId() {
    let highest = 0

    data.split("\n").forEach(pass => {
        let cur = codeToJSON(pass)
        if (cur > highest) highest = cur
    });

    return highest
}

function getYourId() {
    let ids = data.split("\n")
                    .map(boardingPass => codeToJSON(boardingPass))
                    .sort()

    return ids.find(id => id - ids[ids.indexOf(id) - 1] == 2)
}

//Useless function
 function binaryToDec(bin) {
    bin.split("")
    let result = 0
    for (let i = bin.length - 1; i >= 0; i--) {
        if (bin[i] == 1) 
        result += 2**(bin.length-i-1)
    }
    return result
}