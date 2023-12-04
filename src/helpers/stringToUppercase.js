import stringToSingular from 'helpers/stringToSingular';

const stringToUppercase = (string, singular = false) => {
    if (singular && string.endsWith('s')) {
        string = stringToSingular(string);
    }
    return string.charAt(0) + string.slice(1);
};

export default stringToUppercase;
