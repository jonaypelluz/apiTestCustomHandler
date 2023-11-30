const extractMatchedString = (inputString, regexPattern) => {
    const regExp = new RegExp(regexPattern);
    const matches = inputString.match(regExp);
    return matches.length > 0 ? matches[0] : inputString;
};

const useConvert = (array, conversions) => {
    let regex = [];
    let mutations = [];
    let converted = [];

    conversions.forEach((item) => {
        const parts = item.split('|');
        if (parts.length > 2) {
            regex[parts[0]] = parts[1] + '|' + parts[2];
        } else {
            mutations[parts[0]] = parts[1];
        }
    });

    array.map((s) => {
        let x = {};
        Object.keys(s).forEach((k) => {
            x[k] = s[k];
        });
        Object.keys(mutations).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(x, key)) {
                x[mutations[key]] = x[key];
                delete x[key];
            }
        });
        Object.keys(regex).forEach((key) => {
            const parts = regex[key].split('|');
            if (Object.prototype.hasOwnProperty.call(x, key)) {
                x[parts[0]] = extractMatchedString(x[key], parts[1]);
                delete x[key];
            }
        });
        converted.push(x);
    });

    return converted;
};

export default useConvert;
