var data = require("./data").days.six

data = data.split("\n\n")

/*This is part one
let result = 0

data.forEach(group => {
    let answers = group.split("")
    let answeredQuestions = ""
    answers.forEach(letter => {
        if (!answeredQuestions.includes(letter) && /[a-z]/g.test(letter)) {
            answeredQuestions += letter
        }
    });
    result += answeredQuestions.length
});

console.log(result)*/

//part two
let result = 0

data.forEach(group => {
    let e = group.match(/[a-z]/g)
    let alreadyDone = ""
    e.forEach(letter => {
        if (!alreadyDone.includes(letter)) {
            let amountOfAnswers = e.filter(l => l === letter).length
            if (amountOfAnswers == group.split("\n").length) {
                result++
            }
            alreadyDone += letter
        }
    });

});

console.log(result)
