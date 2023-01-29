export const TYPES = {
    CHARACTERS: 'CHARACTERS'
};

const CONVERSIONS = {
    CHARACTERS: {
        name: 'title',
        species: 'desc'
    }
};

const useConvert = (array, type) => {
    let conversion = CONVERSIONS[type];
    let converted = [];

    array.map(s => {
        let x = {};
        Object.keys(s).forEach(k => {
            x[k] = s[k];
        });
        Object.keys(conversion).forEach(key => {
            if (x.hasOwnProperty(key)) {
                x[conversion[key]] = x[key];
                delete x[key];
            }
        });
        converted.push(x);
    });

    return converted;
};

export default useConvert;
