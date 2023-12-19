import Logger from 'services/Logger';
import iterateObject from 'helpers/iterateObject';

const accessNestedProperty = (obj, key) => {
    const parts = key.split('|');
    return parts.reduce((currentObject, key) => {
        return currentObject && key in currentObject ? currentObject[key] : undefined;
    }, obj);
};

const gatherApiResponseItems = (keys, response) => {
    let foundProperties = {};

    if (keys.length === 0) {
        foundProperties = {
            count: response.length,
            results: response,
        };
    } else {
        Object.keys(keys).forEach((key) => {
            if (keys[key].indexOf('|') !== -1) {
                foundProperties[key] = accessNestedProperty(response, keys[key]);
            } else {
                foundProperties[key] = iterateObject(keys[key], response);
            }
        });
    }

    Logger.log('Found properties', foundProperties);

    return foundProperties;
};

export default gatherApiResponseItems;

// const parts = item.split('|');
// if (parts.length > 2) {
//     regex[parts[0]] = parts[1] + '|' + parts[2];
// } else {
//     mutations[parts[0]] = parts[1];
// }
