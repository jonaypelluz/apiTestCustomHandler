const stringToSingular = (string) => {
    return string.endsWith('s') ? string.slice(0, -1) : string;
};

export default stringToSingular;
