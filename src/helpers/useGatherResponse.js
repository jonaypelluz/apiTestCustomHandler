import Logger from 'services/Logger';

const iterate = (keyToFind, obj, maxDepth = 2, depth = 0) => {
    for (const key in obj) {
        if (
            depth < maxDepth &&
            typeof obj[key] === 'object' &&
            obj[key] !== null &&
            keyToFind !== key
        ) {
            const result = iterate(keyToFind, obj[key], maxDepth, depth + 1);
            if (result !== undefined) {
                return result;
            }
        } else if (keyToFind === key) {
            return obj[key];
        }
    }

    return undefined;
};

const useGatherResponse = (keys, response) => {
    const foundProperties = {};

    keys.forEach((key) => {
        foundProperties[key] = iterate(key, response);
    });

    Logger.log('Foun properties', foundProperties);

    return foundProperties;
};

export default useGatherResponse;
