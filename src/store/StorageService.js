import Logger from 'services/Logger';

const StorageService = {
    API_SELECTED: 'API_SELECTED',
    CONFIG_SELECTED: 'CONFIG_SELECTED',

    setItem(key, value) {
        Logger.log(`Setting localStorage key: ${key}`, value);
        try {
            const serializedValue = JSON.stringify(value);
            localStorage.setItem(key, serializedValue);
        } catch (error) {
            Logger.error('Error storing data:', error);
        }
    },

    getItem(key) {
        Logger.info('Getting from localStorage the key: ', key);
        try {
            const serializedValue = localStorage.getItem(key);
            const parsedValue = serializedValue ? JSON.parse(serializedValue) : null;

            return parsedValue;
        } catch (error) {
            Logger.error('Error retrieving data:', error);
            return null;
        }
    },

    removeItem(key) {
        Logger.info('Removing localStorage key: ', key);
        try {
            localStorage.removeItem(key);
        } catch (error) {
            Logger.error('Error removing data:', error);
        }
    },

    clearStorage() {
        Logger.info('Clearing localStorage');
        try {
            localStorage.clear();
        } catch (error) {
            Logger.error('Error clearing storage:', error);
        }
    },
};

export default StorageService;
