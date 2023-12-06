import axios from 'axios';
import { useState } from 'react';
import Logger from 'services/Logger';
import PaginationService from 'services/PaginationService';
import ResponseService from 'services/ResponseService';
import buildQueryString from 'helpers/buildQueryString';

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

const ApiService = () => {
    const [loading, setLoading] = useState(false);

    const paginationService = new PaginationService();
    const responseService = new ResponseService();

    const setLoadingState = (status) => {
        setLoading(status);
    };

    const getItems = async (config, section, currentPage) => {
        setLoadingState(true);
        let url = config.apiBaseUrl;

        try {
            const apiConfig = config[section];
            const paginationObj = paginationService.createPaginationObject(apiConfig, currentPage);

            url = url + apiConfig.endpoint;

            let response;

            if (config.apiType === 'GraphQL') {
                response = await makeGraphQLRequest(url, apiConfig.query, paginationObj);
            } else {
                url =
                    Object.keys(paginationObj).length > 0
                        ? buildQueryString(url, paginationObj)
                        : url;
                Logger.debug('URL', url);
                response = await makeRestRequest(url);
            }
            Logger.log(`Api response for ${section}`, response);

            setLoadingState(false);

            return responseService.handleApiResponse('multiple', response, apiConfig, section);
        } catch (error) {
            setLoadingState(false);
            throw error;
        }
    };

    const getItem = async (config, section, itemId) => {
        setLoadingState(true);
        let url = config.apiBaseUrl;
        const apiConfig = config[section];

        try {
            url += apiConfig.endpoint;
            let response;

            if (config.apiType === 'GraphQL') {
                response = await makeGraphQLRequest(url, apiConfig.singleQuery, { id: itemId });
            } else {
                response = await makeRestRequest(`${url}/${itemId}`);
            }
            Logger.log(`Api response for ${itemId} in ${section}`, response);

            setLoadingState(false);

            return responseService.handleApiResponse('single', response, apiConfig, section);
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
