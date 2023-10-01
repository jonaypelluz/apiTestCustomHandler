const useConvert = (array, conversions) => {
    let converted = [];

    array.map((s) => {
        let x = {};
        Object.keys(s).forEach((k) => {
            x[k] = s[k];
        });
        Object.keys(conversions).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(x, key)) {
                x[conversions[key]] = x[key];
                delete x[key];
            }
        });
        converted.push(x);
    });

    return converted;
};

export default useConvert;
