const iterateObject = (keyToFind, obj, maxDepth = 2, depth = 0) => {
    for (const key in obj) {
        if (
            depth < maxDepth &&
            typeof obj[key] === 'object' &&
            obj[key] !== null &&
            keyToFind !== key
        ) {
            const result = iterateObject(keyToFind, obj[key], maxDepth, depth + 1);
            if (result !== undefined) {
                return result;
            }
        } else if (keyToFind === key) {
            return obj[key];
        }
    }

    return undefined;
};

export default iterateObject;
