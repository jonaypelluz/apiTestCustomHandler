import ResponseAdapter from './ResponseAdapter';
import gatherApiResponseItems from 'helpers/gatherApiResponseItems';
import { normalizeItems } from 'helpers/normalizeItems';
import stringToSingular from 'helpers/stringToSingular';
import Logger from 'services/Logger';

class MultipleResponse extends ResponseAdapter {
    handleResponse(response, apiConfig, section) {
        Logger.debug('RESPONSE', response);
        Logger.debug('API CONFIG KEYS', apiConfig.apiStructure);
        let results = gatherApiResponseItems(apiConfig.apiStructure, response);
        Logger.debug('RESULTS', results);
        results.results = normalizeItems(results.results, apiConfig, stringToSingular(section));
        Logger.debug('NORMALIZE ITEMS', results.results);
        return results;
    }
}

export default MultipleResponse;
