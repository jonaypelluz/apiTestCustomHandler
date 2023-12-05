import stringToSingular from 'helpers/stringToSingular';

const stringToCapitalize = (string, singular = false) => {
    if (singular && string.endsWith('s')) {
        string = stringToSingular(string);
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
};

export default stringToCapitalize;
