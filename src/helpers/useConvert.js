const useConvert = (array, conversions) => {
    let mutations = [];
    let converted = [];

    conversions.forEach((item) => {
        const parts = item.split('|');
        mutations[parts[0]] = parts[1];
    });

    array.map((s) => {
        let x = {};
        Object.keys(s).forEach((k) => {
            x[k] = s[k];
        });
        Object.keys(mutations).forEach((key) => {
            if (Object.prototype.hasOwnProperty.call(x, key)) {
                x[mutations[key]] = x[key];
                delete x[key];
            }
        });
        converted.push(x);
    });

    return converted;
};

export default useConvert;
