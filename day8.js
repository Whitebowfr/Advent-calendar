var log = require("./data").days.eight

log = `jmp +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`

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

function isLoopingForever(logs) {
    let iValues = []
    for(let i = 0; i < logs.length; i++) {
        if (iValues.filter(o => o === i).length == 0) {
            if (logs[i].type == "jmp") {
                if (logs[i].value - 1 != -1) i += logs[i].value - 1
            }
            iValues.push(i)
        } else {
            return true
        }
    }
    return false
}
function modify() {
    let iterator = 0
    let logss = parseLogs()
    let ogLogs = JSON.parse(JSON.stringify(logss))
    let lastModified = -1
    
    while (isLoopingForever(logss)) {
        if (lastModified > -1) {
            logss = JSON.parse(JSON.stringify(ogLogs))
            console.log(logss)
            lastModified = -1
        }
        if (logss[iterator].type == "nop" || logss[iterator].type == "jmp") {
            logss[iterator].type = logss[iterator].type == "nop" ? "jmp" : "nop"
            lastModified = iterator
        }
        iterator++
    }

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

modify()