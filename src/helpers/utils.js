export function random (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

export function createID () {
    return `${(+new Date).toString(16)}_${Math.round(10000 * Math.random())}`
}
