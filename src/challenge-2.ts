/**
 * Challenge 2
 *
 * You start with a string consisting of uppercase and lowercase letters (example: dabAcCaCBAcCcaDA.)
 * We want you to write a function that takes a string and removes all characters that are followed by the same character of the
 * opposite case. The rules are:
 *
 * For input: "aA", a and A are of the opposite case, returning an empty string.
 * For input: "abBA", bB are of the opposite case, leaving aA. As above, this is also removed, returning an empty string as well.
 * For input: "abAB", no two adjacent characters are of the same type, so the same string is returned.
 * For input: "aabAAB", even though aa and AA are the same character, their cases match, and so nothing happens.
 * Now, consider a larger example, dabAcCaCBAcCcaDA:
 *
 *   - dabAcCaCBAcCcaDA  The first 'cC' is removed.
 *   - dabAaCBAcCcaDA    This creates 'Aa', which is removed.
 *   - dabCBAcCcaDA      Either 'cC' or 'Cc' are removed (the result is the same).
 *   - dabCBAcaDA        No further actions can be taken.
 *
 * What is the solution for: "VvbBfpPFrRyRrNpYyPDlLdVvNnMmnOCcosOoSoOfkKKkFJjyYjJWwHhnSstuBbdsSDqQUqQkKVvILlVvGgjJiVcCvvfBbvVoOGgFn"?
 */

export const removeOppositeChars = (input: string): string => {
    let index/*, operationNumber*/:number;
    let prev, curr:string;
    // operationNumber = 0;
    function findOppositeCaseAndReplaceRecursive(arrInput: string[]):string {
        for (index = 1; index < arrInput.length; index++) {
            prev = arrInput[index -1];
            curr = arrInput[index];
            let target = prev + curr;
            if(input.includes(target) && prev.toLowerCase() == curr.toLowerCase() && prev != curr){
                // console.log('operation: ' + operationNumber++ + ' input: ' + input + ' index: ' + index + ' curr: ' + curr + ' prev: ' + prev);
                input = input.replace(new RegExp(target, 'g'), '');
                findOppositeCaseAndReplaceRecursive(Array.from(input));
            }
            if(index == arrInput.length){
                break
            }
        }
        return input
    }
    return findOppositeCaseAndReplaceRecursive(Array.from(input));
};

