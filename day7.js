var rules = require("./data").days.seven

//Transforming the rules into a JSON object
let bagRules = {}

function transformToJSONpart1() {
    rules.split("\n").forEach(rule => {
        //Separate every children bags
        let bagCanFit = rule.match(/[0-9][^,]+/g)
    
        //Can be null when the current bag doesn't have any children
        if (bagCanFit != null) {
            bagCanFit.forEach(bag => {
                //Just get the color of the bag, not the number
                let colorOfBag = bag.replace(/ bag(s?)\W?/, "").replace(/[0-9]+ /g, "")
                if (bagRules[colorOfBag] == null) {
                    bagRules[colorOfBag] = []
                }
                bagRules[colorOfBag].push(ruleForBag)
            })
        }
    });
}

function transformToJSONpart2() {
    rules.split("\n").forEach(rule => {
        let ruleForBag = rule.split(" contain ")[0].replace(/ bags/, "")
        let bagCanFit = rule.match(/[0-9][^,]+/g)
        if (bagCanFit != null) {
            bagRules[ruleForBag] = {}
            bagCanFit.forEach(bag => {
                let numberOfBags = parseInt(bag.match(/[0-9]+/g)[0])
                let colorOfBag = bag.replace(/ bag(s?)\W?/, "").replace(/[0-9]+ /g, "")
                bagRules[ruleForBag][colorOfBag] = numberOfBags
            });
        } else if (rule.includes("contain no other bags.")) {
            bagRules[ruleForBag] = {}
        }
    });
}

transformToJSONpart2()

let result = 0
let countedBags = []
/**
 * This function increments the "result" variable at each nested bag
 * @param {string} bag The color of the bag
 */
function countNumberOfBagsItCanBeHeldBy(bag) {
    let bagsToCheck = bagRules[bag]

    //This can be undefined if the bag doesn't have any nested bags
    if (bagsToCheck != undefined) {
        bagsToCheck.forEach(bagBis => {

            //Checks if the bag hasn't already been counted
            if (countedBags.filter(b => b === bagBis) == 0) {
                result++
                countedBags.push(bagBis)
                countNumberOfBagsItCanBeHeldBy(bagBis)
            }

        })
    }
}

let memo
function countNumberOfbagsInside(bag) {
    memo = memo || {}
    if (memo[bag]) {
        return memo[bag]
    }

    var quantityInThisBag = 1
    let bagsToCheck = Object.keys(bagRules[bag])

    if (bagsToCheck != undefined) {
        bagsToCheck.forEach(bagBis => {
            quantityInThisBag += countNumberOfbagsInside(bagBis) * bagRules[bag][bagBis]
        })
    }

    return memo[bag] = quantityInThisBag
}
console.log(countNumberOfbagsInside("shiny gold") - 1)
