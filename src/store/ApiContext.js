import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const ApiContext = createContext();

const ApiProviderImpl = ({ children }) => {
    const [subscribers, setSubscribers] = useState([]);
    const [api, setApi] = useState('');
    const [config, setConfig] = useState('');

    const subscribe = (eventName, callback) => {
        const id = Date.now().toString();
        setSubscribers((prevSubscribers) => [...prevSubscribers, { id, eventName, callback }]);
        return () => {
            setSubscribers((prevSubscribers) =>
                prevSubscribers.filter((subscriber) => subscriber.id !== id),
            );
        };
    };

    const emit = (eventName, ...args) => {
        const matchingSubscribers = subscribers.filter(
            (subscriber) => subscriber.eventName === eventName,
        );
        matchingSubscribers.forEach((subscriber) => subscriber.callback(...args));
    };

    const value = {
        api,
        setApi,
        config,
        setConfig,
        subscribe,
        emit,
    };

    return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
};

ApiProviderImpl.propTypes = {
    children: PropTypes.node.isRequired,
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

ApiProvider.propTypes = {
    children: PropTypes.node.isRequired,
};
