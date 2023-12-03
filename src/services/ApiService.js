import axios from 'axios';
import { useState } from 'react';

const makeGraphQLRequest = async (url, query, variables) => {
    return await axios
        .post(url, {
            query,
            variables,
        })
        .then((response) =>
            response.data && response.data.data ? response.data.data : response.data,
        );
};

const makeRestRequest = async (url) => {
    return await axios
        .get(url)
        .then((response) =>
            response.data && response.data.data ? response.data.data : response.data,
        );
};

const buildQueryString = (url, variables) => {
    const queryString = Object.keys(variables)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(variables[key])}`)
        .join('&');
    return `${url}?${queryString}`;
};

const createsVariablesObject = (config, params) => {
    const structure = config.params;
    let body = [];
    let result = {};

    structure.forEach((item) => {
        const parts = item.split('|');
        body[parts[0]] = parts[1];
    });

    Object.keys(body).forEach((key) => {
        for (let param in params) {
            if (param === key) {
                result[key] = body[key] === 'int' ? parseInt(params[param]) : params[param];
            }
        }
    });

    if (config.pagination && !Object.keys(result).includes(config.pagination)) {
        result[config.pagination] = 1;
    }

    return result;
};

// const handleResponse = () => {

// };

const ApiService = () => {
    const [loading, setLoading] = useState(false);

    const setLoadingState = (status) => {
        setLoading(status);
    };

    const getItems = async (config, section, params) => {
        let url = config.apiBaseUrl;

        try {
            setLoadingState(true);
            const apiConfig = config[section];
            const variables = createsVariablesObject(apiConfig, params);
            url = url + apiConfig.endpoint;

            let response;

            if (config.apiType === 'GraphQL') {
                response = await makeGraphQLRequest(url, apiConfig.query, variables);
            } else {
                url = Object.keys(variables).length > 0 ? buildQueryString(url, variables) : url;
                response = await makeRestRequest(url);
            }

            setLoadingState(false);

            return response;
        } catch (error) {
            setLoadingState(false);
            throw error;
        }
    };

    const getItem = async (url, itemId, useQuery = '') => {
        try {
            setLoadingState(true);

            let response;

            if (useQuery !== '') {
                response = await makeGraphQLRequest(url, useQuery);
            } else {
                response = await makeRestRequest(`${url}/${itemId}`);
            }

            setLoadingState(false);

            return response;
        } catch (error) {
            setLoadingState(false);
            throw error;
        }
    };

    return {
        getItems,
        getItem,
        loading,
    };
};

export default ApiService;
