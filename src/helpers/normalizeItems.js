import iterateObject from 'helpers/iterateObject';

const extractMatchedString = (inputString, regexPattern) => {
    const regExp = new RegExp(regexPattern);
    const matches = inputString.match(regExp);
    return matches.length > 0 ? matches[0] : inputString;
};

const useConvert = (array, conversions, path) => {
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
            x[mutations[key]] = iterateObject(key, x);
        });

        Object.keys(regex).forEach((key) => {
            let foundKey = iterateObject(key, x);
            if (foundKey) {
                const parts = regex[key].split('|');
                x[parts[0]] = extractMatchedString(foundKey, parts[1]);
            }
        });

        x.url = `/${path}/${x.id}`;

        converted.push(x);
    });

    return converted;
};

export default useConvert;
