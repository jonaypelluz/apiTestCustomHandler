import axios from 'axios';
import { useState } from 'react';
import gatherApiResponseItems from 'helpers/gatherApiResponseItems';
import { normalizeItems, normalizeItem, normalizeConversions } from 'helpers/normalizeItems';
import stringToSingular from 'helpers/stringToSingular';
import Logger from 'services/Logger';

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

/**
 * TODO:
 * I am trying to find a more generic way to deal with this
 * */
const createsPaginationObject = (config, currentPage) => {
    let body = {};

    if (config.pagination.includes('|')) {
        // offset / limit
        const parts = config.pagination.split('|');
        parts.forEach((part) => {
            body[part] = part === 'limit' ? config.perPage : config.perPage * (currentPage - 1);
        });
    } else {
        // page
        body[config.pagination] = currentPage;
    }

    return body;
};

const handleResponse = (response, apiConfig) => {
    let results = gatherApiResponseItems(apiConfig.keys, response);
    results.results = normalizeItems(
        results.results,
        apiConfig.conversions,
        stringToSingular(apiConfig.endpoint),
    );
    return results;
};

const handleSingleResponse = (response, apiConfig) => {
    const conversions = normalizeConversions(apiConfig.conversions);
    const item = normalizeItem(response, conversions, stringToSingular(apiConfig.endpoint));
    return item;
};

const ApiService = () => {
    const [loading, setLoading] = useState(false);

    const setLoadingState = (status) => {
        setLoading(status);
    };

    const getItems = async (config, section, currentPage) => {
        setLoadingState(true);
        let url = config.apiBaseUrl;

        try {
            const apiConfig = config[section];
            const paginationObj = createsPaginationObject(apiConfig, currentPage);
            url = url + apiConfig.endpoint;

            let response;

            if (config.apiType === 'GraphQL') {
                response = await makeGraphQLRequest(url, apiConfig.query, paginationObj);
            } else {
                url =
                    Object.keys(paginationObj).length > 0
                        ? buildQueryString(url, paginationObj)
                        : url;
                response = await makeRestRequest(url);
            }
            Logger.log(`Api response for ${section}`, response);

            setLoadingState(false);

            return handleResponse(response, apiConfig);
        } catch (error) {
            setLoadingState(false);
            throw error;
        }
    };

    const getItem = async (config, section, itemId) => {
        setLoadingState(true);
        let url = config.apiBaseUrl;
        const apiConfig = config[section];

        const endpoint =
            'singleEndpoint' in apiConfig ? apiConfig.singleEndpoint : apiConfig.endpoint;

        try {
            url += endpoint;

            let response;

            if (config.apiType === 'GraphQL') {
                response = await makeGraphQLRequest(url, apiConfig.query, { id: itemId });
            } else {
                response = await makeRestRequest(`${url}/${itemId}`);
            }
            Logger.log(`Api response for ${itemId} in ${section}`, response);

            setLoadingState(false);

            return handleSingleResponse(response, apiConfig);
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
