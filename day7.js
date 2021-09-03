var rules = require("./data").days.seven

//Transforming the rules into a JSON object
let bagRules = {}

rules.split("\n").forEach(rule => {
    let bagCanFit = rule.match(/[0-9][^,]+/g)
    let ruleForBag = rule.replace(/ bags.*/, "")
    if (bagCanFit != null) {
        bagCanFit.forEach(bag => {
            let colorOfBag = bag.replace(/ bag(s?)\W?/, "").replace(/[0-9]+ /g, "")
            if (bagRules[colorOfBag] == null) {
                bagRules[colorOfBag] = []
            }
            bagRules[colorOfBag].push(ruleForBag)
        })
    }
});


let result = 0

let countedBags = []
function countNumberOfBagsItCanBeHeldBy(bag) {
    let bagsToCheck = bagRules[bag]
    if (bagsToCheck != undefined) {
        bagsToCheck.forEach(bagBis => {
            if (countedBags.filter(b => b === bagBis) == 0) {
                result++
                countedBags.push(bagBis)
                //ik recursion isn't good especially in nested loops
                countNumberOfBagsItCanBeHeldBy(bagBis)
            }
        })
    }
}

countNumberOfBagsItCanBeHeldBy("shiny gold")
console.log(result)

/*Scraped idea i'm leaving here in case I need it later
rules.split("\n").forEach(rule => {
    let ruleForBag = rule.split(" contain ")[0]
    let bagCanFit = rule.match(/[0-9][^,]+/g)
    if (bagCanFit != null) {
        bagRules[ruleForBag] = {}
        bagCanFit.forEach(bag => {
            let numberOfBags = parseInt(bag.match(/[0-9]+/g)[0])
            let colorOfBag = bag.replace(/ bag(s?)\W?/, "").replace(/[0-9]+ /g, "")
            if (colorOfBag == "shiny gold") {
                canHoldShinyBag.push(ruleForBag)
            }
            bagRules[ruleForBag][colorOfBag] = numberOfBags
        });
    } else if (rule.includes("contain no other bags.")) {
        bagRules[ruleForBag] = {}
    }
});*/