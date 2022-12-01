
/**
 * 1. Row cannot have SAME LETTER TWICE
 * 2. Column cannot have SAME LETTER TWICE
 * 3. Table cannot have SAME LETTER COMBINATION TWICE
 */

const letters = 'abcdefgh'.toUpperCase().split('')
const table = []
const numberOfRows = 4
for (let i = 0; i < numberOfRows; i++) {
    table.push([])
}

/**
 * Function loops through all the ROWS inside of the TABLE
 */
function fillTable() {
    table.map((row, rowIndex, table) => {
        fillRow(row, table)
    })
}

/**
 * Function populates a ROW inside of the TABLE
 * This is a RECURSIVE function
 * The BASE CASE of the function is when the length of the ROW is EQUAL to 4
 * Therefore, the recalling of the function stops when the ARRAY has 4 items inside
 */
function fillRow(row, table) {
    if (row.length === 4) {
        return row
    }
    const indexToFill = row.length
    const letterIndex = 0
    let combination = ''
    combination = letterCombination(row, indexToFill, table, letterIndex, combination)

    row.push(combination)

    return fillRow(row, table)
}

/**
 * Function CREATES a letter COMBINCATION
 * This is a RECURSIVE function
 * The RECURSIVE function BUILDS a combination through trying out different combination
 * The building of combinations also uses ROLLBACK function
 * @return the letter combination
 */
function letterCombination(row, indexToFill, table, letterIndex, combination) {

    if (combination.length === 2) {
        return combination
    } else if (letterIndex > (letters.length - 1)) {
        letterIndex = rollBack(row, indexToFill, table, letterIndex, combination)
    }

    const char = letters[letterIndex]
    const validationChecking = combinationChecks(row, indexToFill, table, letterIndex, combination, char)

    if (validationChecking) {
        combination += char
        return letterCombination(row, indexToFill, table, letterIndex + 1, combination)
    } else {
        return letterCombination(row, indexToFill, table, letterIndex + 1, combination)
    }
}

/**
 * Does the following Checks
 * 1. Row cannot have SAME LETTER TWICE
 * 2. Column cannot have SAME LETTER TWICE
 * 3. Table cannot have SAME LETTER COMBINATION TWICE
 */
function combinationChecks(row, indexToFill, table, letterIndex, combination, char) {
    const letterCheckInCombo = combination.includes(char)
    const rowCheck = row.filter(combo => combo.includes(char)).length > 0 ? true : false
    const columnCheck = table.filter(row => row[indexToFill]?.includes(char) ?? false).length > 0 ? true : false
    let comboDoubleCheck = false

    if (combination.length === 1) {
        const tempCombination = combination + char
        comboDoubleCheck = table.filter(row => row.includes(tempCombination)).length > 0 ? true : false
    }

    return (!letterCheckInCombo && !rowCheck && !columnCheck && !comboDoubleCheck)
}

/**
 * ROLLBACK tries to change the combincations of already made combinations
 * This is to check if a suitable combincation can be found to complete the ROW combinations
 */
function rollBack(row, indexToFill, table, letterIndex, combination) {

    if(combination.length === 2) {
        indexToFill += 1
        row.length > 0 ? row[row.length - 1] = combination : row[0] = combination
        return letterIndex > (letters.length - 1) ? 0 : letterIndex + 1  
    }

    letterIndex = (letterIndex > letters.length ? 0 : letterIndex)

    let lastComboInRow = row[row.length - 1].split('')
    let lastLetterInCombo = lastComboInRow[lastComboInRow.length - 1]
    const indexOfLetterToRemove = letters.findIndex(letter => letter === lastLetterInCombo)
    lastComboInRow.pop()
    const tempCombination = lastComboInRow.join('')
    row[(indexToFill - 1)] = tempCombination    

    if(row[row.length - 1] === '') {
        indexToFill = indexToFill - 1
        row.pop()
    }

    const indexOfLetterToCheckFrom = ((indexOfLetterToRemove + 1) > (letters.length - 1)) ? 0 : (indexOfLetterToRemove + 1)
    const char = letters[indexOfLetterToCheckFrom]
    const validationChecking = combinationChecks(row, indexToFill, table, letterIndex, tempCombination, char)

    if(validationChecking) {
        combination = tempCombination + char
        return rollBack(row, indexToFill, table, letterIndex, combination)
    } else {
        return rollBack(row, indexToFill, table, letterIndex, combination)
    } 
}

fillTable()