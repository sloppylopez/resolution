/**
 * Challenge 1
 *
 * Find the closest number to num from the listOfNumbers. Assume the input array only contains unique values
 */
export const getClosestValue = (num: number, listOfNumbers: number[]): number => {
    return listOfNumbers.reduce(function(prev: number, curr: number) {
        return (Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev);
    });
};
