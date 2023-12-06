const buildQueryString = (url, variables) => {
    const queryString = Object.keys(variables)
        .map((key) => `${key}=${encodeURIComponent(variables[key])}`)
        .join('&');
    return `${url}?${queryString}`;
};

export default buildQueryString;
