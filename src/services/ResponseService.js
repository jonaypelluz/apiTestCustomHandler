import SingleResponse from 'services/adapters/response/SingleResponse';
import MultipleResponse from 'services/adapters/response/MultipleResponse';

class ResponseService {
    constructor() {
        this.handlers = {
            single: new SingleResponse(),
            multiple: new MultipleResponse(),
        };
    }

    handleApiResponse(responseType, response, apiConfig, section) {
        const handler = this.handlers[responseType];

        if (!handler) {
            throw new Error('Unsupported response type');
        }

        return handler.handleResponse(response, apiConfig, section);
    }
}

export default ResponseService;
