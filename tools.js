export function getRandIntInclusive(min, max) {
    // Returns a random integer between inclusive min and inclusive max;

    // ceil and floor min and max
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
