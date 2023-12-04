import Logger from 'services/Logger';
import iterateObject from 'helpers/iterateObject';

const gatherApiResponseItems = (keys, response) => {
    let foundProperties = {};

    if (keys.length === 0) {
        foundProperties = {
            count: response.length,
            results: response,
        };
    } else {
        keys.forEach((key) => {
            foundProperties[key] = iterateObject(key, response);
        });
    }

    Logger.log('Found properties', foundProperties);

    return foundProperties;
};

export default gatherApiResponseItems;
