import ResponseAdapter from './ResponseAdapter';
import { normalizeItem, normalizeConversions } from 'helpers/normalizeItems';
import stringToSingular from 'helpers/stringToSingular';

class SingleResponse extends ResponseAdapter {
    handleResponse(response, apiConfig, section) {
        const conversions = normalizeConversions(apiConfig);
        const item = normalizeItem(response, conversions, stringToSingular(section));
        return item;
    }
}

export default SingleResponse;
