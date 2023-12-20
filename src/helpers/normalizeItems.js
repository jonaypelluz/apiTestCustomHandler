import iterateObject from 'helpers/iterateObject';

const extractMatchedString = (inputString, regexPattern) => {
    const regExp = new RegExp(regexPattern);
    const matches = inputString.match(regExp);
    return matches.length > 0 ? matches[0] : inputString;
};

const normalizeItem = (object, normalizedConversions, path, depth = 2) => {
    const regex = normalizedConversions.regex;
    const mutations = normalizedConversions.mutations;
    let converted = {};

    Object.keys(object).forEach((k) => {
        converted[k] = object[k];
    });

    Object.keys(mutations).forEach((key) => {
        const foundValue = iterateObject(key, converted, depth);
        converted[key] = foundValue; // We keep the old property also
        converted[mutations[key]] = foundValue;
    });

    Object.keys(regex).forEach((key) => {
        let foundKey = iterateObject(key, converted, depth);
        if (foundKey) {
            const parts = regex[key].split('|');
            converted[parts[0]] = extractMatchedString(foundKey, parts[1]);
        }
    });

    converted.url = `/${path}/${converted.id}`;

    return converted;
};

const normalizeConversions = (config) => {
    let regex = [];
    let mutations = [];
    const conversions = config.conversions;

    conversions.forEach((item) => {
        const parts = item.split('|');
        if (parts.length > 2) {
            regex[parts[0]] = parts[1] + '|' + parts[2];
        } else {
            mutations[parts[0]] = parts[1];
        }
    });

    const includedKeys = config.itemIncludedKeys.reduce((acc, curr) => {
        acc[curr] = curr;
        return acc;
    }, {});

    mutations = { ...mutations, ...includedKeys };

    return { regex, mutations };
};

const normalizeItems = (array, config, path) => {
    const normalizedConversions = normalizeConversions(config);
    let converted = [];

    array.map((s) => {
        let x = normalizeItem(s, normalizedConversions, path);
        converted.push(x);
    });

    return converted;
};

export { normalizeItems, normalizeItem, normalizeConversions };
