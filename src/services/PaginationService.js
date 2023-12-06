import OffsetLimit from 'services/adapters/pagination/OffsetLimit';
import PageNumber from 'services/adapters/pagination/PageNumber';
import PageNumberPageSize from 'services/adapters/pagination/PageNumberPageSize';

class PaginationService {
    constructor() {
        this.adapters = {
            'offset-limit': new OffsetLimit(),
            'page-number': new PageNumber(),
            'page-number-page-size': new PageNumberPageSize(),
        };
    }

    createPaginationObject(config, currentPage) {
        const adapter = this.adapters[config.pagination];

        if (!adapter) {
            throw new Error('Unsupported pagination type');
        }

        return adapter.getPaginationParams(config, currentPage);
    }
}

export default PaginationService;
