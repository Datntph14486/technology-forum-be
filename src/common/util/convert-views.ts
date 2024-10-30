const mapping = {
    K: 1000,
    M: 1000000,
    T: 1000000000,
};

function convertViews(num) {
    if (num >= mapping['T']) {
        return takeDecimalNumber(num / mapping['T'], 1).toString() + 'T';
    } else if (num >= mapping['M']) {
        return takeDecimalNumber(num / mapping['M'], 1).toString() + 'M';
    } else if (num >= mapping['K']) {
        return takeDecimalNumber(num / mapping['K'], 1).toString() + 'K';
    } else {
        return num.toString();
    }
}

function takeDecimalNumber(num, n) {
    let base = 10 ** n;
    let result = Math.round(num * base) / base;
    return result;
}

export default convertViews;
