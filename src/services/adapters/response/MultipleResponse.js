import ResponseAdapter from './ResponseAdapter';
import gatherApiResponseItems from 'helpers/gatherApiResponseItems';
import { normalizeItems } from 'helpers/normalizeItems';
import stringToSingular from 'helpers/stringToSingular';

class MultipleResponse extends ResponseAdapter {
    handleResponse(response, apiConfig, section) {
        let results = gatherApiResponseItems(apiConfig.jsonStructure, response);
        let depth = 2;
        if (apiConfig.jsonDepth) {
            depth = apiConfig.jsonDepth;
        }
        results.results = normalizeItems(
            results.results,
            apiConfig,
            stringToSingular(section),
            depth,
        );
        return results;
    }
}

export default MultipleResponse;
