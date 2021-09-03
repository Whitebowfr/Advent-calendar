var data = require("./data").days.six

data = data.split("\n\n")

let result = 0

//This is only part one

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

console.log(result)