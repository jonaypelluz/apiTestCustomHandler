import ResponseAdapter from './ResponseAdapter';
import { normalizeItem, normalizeConversions } from 'helpers/normalizeItems';
import stringToSingular from 'helpers/stringToSingular';

class SingleResponse extends ResponseAdapter {
    handleResponse(response, apiConfig, section) {
        const conversions = normalizeConversions(apiConfig);
        let depth = 2;
        if (apiConfig.jsonDepth) {
            depth = apiConfig.jsonDepth;
        }
        const item = normalizeItem(response, conversions, stringToSingular(section), depth);
        return item;
    }
}

export default SingleResponse;
