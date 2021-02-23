export function parse(src: string, mode: string) {
    let converted: string = "unknown";
    let result: string = "error";
    let decimal: number = 0;

    src.split(' ').filter(x => x.length > 0);

    // Get decimal from any input number
    const isHex = src.indexOf('0x') > -1;
    const isBin = src.indexOf('0b') > -1;
    if (isHex && isBin) {
        return "err";
    } else if (isHex) {
        decimal = parseInt(src, 16);
    } else if (isBin) {
        decimal = parseInt(src.replace('0b', ''), 2);
    } else {
        decimal = parseInt(src, 10);
    }

    if (decimal === null || isNaN(decimal)) {
        return "err";
    }

    if (mode === "hex") {
        converted = '0x' + decimal.toString(16).replace('-', '');
    } else if (mode === "dec") {
        converted = decimal.toString(10).replace('-', '');
    } else if (mode === "bin") {
        converted = '0b' + decimal.toString(2).replace('-', '');
    }

    if (converted) {
        result = converted;
    } else {
        result = "err";
    }

    return result;
}