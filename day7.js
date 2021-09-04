var rules = require("./data").days.seven

//Transforming the rules into a JSON object
let bagRules = {}

function transformToJSONpart1() {
    rules.split("\n").forEach(rule => {
        //Separate every children bags
        let bagCanFit = rule.match(/[0-9][^,]+/g)
    
        //Replace the first "bags", right after the color of the current bag (it's not /g so it just replaces the first match)
        //let ruleForBag = rule.replace(/ bags.*/, "")
    
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
                //ik recursion isn't good especially in nested loops
                countNumberOfBagsItCanBeHeldBy(bagBis)
            }

        })
    }
}

function countNumberOfbagsInside(bag) {

    //I thought quantityInThisBag = 0 would be the solution but it was returning 0, now it works for some reason so could you explain how it's working please ?
    var quantityInThisBag = 1
    let bagsToCheck = Object.keys(bagRules[bag])

    if (bagsToCheck != undefined) {
        bagsToCheck.forEach(bagBis => {
            quantityInThisBag += countNumberOfbagsInside(bagBis) * bagRules[bag][bagBis]
        })
    }

    return quantityInThisBag
}

console.log(countNumberOfbagsInside("shiny gold") - 1)

