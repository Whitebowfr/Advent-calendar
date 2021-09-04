var log = require("./data").days.eight

function parseLogs() {
    let logs = []
    log.split("\n").forEach(line => {
        logs.push({
            type: line.match(/(acc|nop|jmp)/gi)[0],
            value: parseInt(line.match(/(-)?[0-9]+/g)[0])
        })
    });
    return logs
}

function getAccumulatorValue() {
    let logs = parseLogs()
    let iValues = []
    let acc = 0
    for(let i = 0; i <= logs.length; i++) {
        if (iValues.filter(o => o === i).length == 0) {
            switch(logs[i].type) {
                case "acc":
                    acc += logs[i].value
                    break;
                case "jmp":
                    i += logs[i].value - 1
                    break;
            }
            iValues.push(i)
        } else {
            break;
        }
    }
    return acc
}

console.log(getAccumulatorValue())