var data= require("./data").days.four

let countOfValid = 0
const requiredFields = ["iyr", "byr", "eyr", "hgt", "hcl", "ecl", "pid"]

data.split("\n\n").forEach(passport => {
    let valid = true
    requiredFields.forEach(field => {
        if (passport.match(new RegExp(field + ":", "g")) == null) {
            valid = false;
        } else {
            let fieldBis = field + ':([^" "|\n]*)'
            let data = passport.match(new RegExp(fieldBis, "g"))[0].split(":")[1]
            if (!validateData(data, field)) {
                valid = false
            }
        }
    });
   countOfValid += (valid ? 1 : 0)

})

/**
 * Checks for the validity of a passport field
 * @param {(string|int)} data - the data to verify
 * @param {string} type - the type of data. Can be one of byr, iyr, eyr, hgt, hcl, ecl or pid
 * @returns {boolean} - if the data is valid or not
 */
function validateData(data, type) {
    switch(type) {
        case "byr":
            return (data.type == "number" && data.length == 4 && data >= 1920 && data <= 2002)
        case "iyr":
            return (data.type == "number" && data.length == 4 && data >= 2010 && data <= 2020)
        case "eyr":
            return (data.type == "number" && data.length == 4 && data >= 2020 && data <= 2030)
        case "hgt":
            let unit = data.match(/cm|in/g)
            let height = data.match(/.*[0-9]/g)[0]
            if (unit == "cm") {
                return (height >= 150 && height <= 193)
            } else if (unit == "in") {
                return (height >= 59 && height <= 76)
            } else {
                return false
            }
        case "hcl":
            if (!data.includes("#")) return false
            let color = data.match(/[0-9a-f]*/g)[1]
            return (color.length == 6)
        case "ecl":
            let ok = false
            const colors = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
            colors.some(element => {
                if (data == element) {
                    ok = true
                    return true
                }
            });
            return ok
        case "pid":
            let nmbr = data.match(/[0-9]/g)
            return (nmbr.length == 9 && data.type == "number")
        default:
            return false;
    }
}

console.log(countOfValid)