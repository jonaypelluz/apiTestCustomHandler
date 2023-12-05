import iterateObject from 'helpers/iterateObject';

const extractMatchedString = (inputString, regexPattern) => {
    const regExp = new RegExp(regexPattern);
    const matches = inputString.match(regExp);
    return matches.length > 0 ? matches[0] : inputString;
};

const normalizeItem = (object, normalizedConversions, path) => {
    const regex = normalizedConversions.regex;
    const mutations = normalizedConversions.mutations;
    let converted = {};

    Object.keys(object).forEach((k) => {
        converted[k] = object[k];
    });

    Object.keys(mutations).forEach((key) => {
        const foundValue = iterateObject(key, converted);
        converted[key] = foundValue; // We keep the old property in a higher depth
        converted[mutations[key]] = foundValue;
    });

    Object.keys(regex).forEach((key) => {
        let foundKey = iterateObject(key, converted);
        if (foundKey) {
            const parts = regex[key].split('|');
            converted[parts[0]] = extractMatchedString(foundKey, parts[1]);
        }
    });

    converted.url = `/${path}/${converted.id}`;

    return converted;
};

const normalizeConversions = (conversions) => {
    let regex = [];
    let mutations = [];
    conversions.forEach((item) => {
        const parts = item.split('|');
        if (parts.length > 2) {
            regex[parts[0]] = parts[1] + '|' + parts[2];
        } else {
            mutations[parts[0]] = parts[1];
        }
    });

    return { regex, mutations };
};

const normalizeItems = (array, conversions, path) => {
    const normalizedConversions = normalizeConversions(conversions);
    let converted = [];

    array.map((s) => {
        let x = normalizeItem(s, normalizedConversions, path);
        converted.push(x);
    });

    return converted;
};

export { normalizeItems, normalizeItem, normalizeConversions };
