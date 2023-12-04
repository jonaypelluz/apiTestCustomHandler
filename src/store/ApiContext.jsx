import { createContext, useContext, useState, useEffect } from 'react';
import StorageService from 'store/StorageService';
import PropTypes from 'prop-types';
import Logger from 'services/Logger';

const ApiContext = createContext();

const ApiProviderImpl = ({ children }) => {
    const [appName, setAppName] = useState('');
    const [config, setConfig] = useState('');

    useEffect(() => {
        const storedApi = StorageService.getItem(StorageService.API_SELECTED);
        const storedConfig = StorageService.getItem(StorageService.CONFIG_SELECTED);

        setAppName(storedApi !== null ? storedApi : '');
        setConfig(storedConfig !== null ? storedConfig : '');
    }, []);

    useEffect(() => {
        if (appName !== '') {
            Logger.log('Setting context appName...', appName);
            StorageService.setItem(StorageService.API_SELECTED, appName);
        }
    }, [appName]);

    useEffect(() => {
        if (config !== '') {
            Logger.log('Setting context config...', config);
            StorageService.setItem(StorageService.CONFIG_SELECTED, config);
        }
    }, [config]);

    const value = {
        appName,
        setAppName,
        config,
        setConfig,
    };

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

export const ApiProvider = ({ children }) => {
    return <ApiProviderImpl>{children}</ApiProviderImpl>;
};

export const useApiContext = () => {
    const context = useContext(ApiContext);
    if (!context) {
        throw new Error('useApiContext must be used within an ApiProvider');
    }
    return context;
};

ApiProviderImpl.propTypes = {
    children: PropTypes.node.isRequired,
};

ApiProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
