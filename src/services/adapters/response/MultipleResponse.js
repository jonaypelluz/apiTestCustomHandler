import ResponseAdapter from './ResponseAdapter';
import gatherApiResponseItems from 'helpers/gatherApiResponseItems';
import { normalizeItems } from 'helpers/normalizeItems';
import stringToSingular from 'helpers/stringToSingular';

class MultipleResponse extends ResponseAdapter {
    handleResponse(response, apiConfig, section) {
        let results = gatherApiResponseItems(apiConfig.keys, response);
        results.results = normalizeItems(results.results, apiConfig, stringToSingular(section));
        return results;
    }
}

export default MultipleResponse;
