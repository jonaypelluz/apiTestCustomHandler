import PaginationAdapter from './PaginationAdapter';

class OffsetLimit extends PaginationAdapter {
    getPaginationParams(config, currentPage) {
        return {
            offset: config.perPage * (currentPage - 1),
            limit: config.perPage,
        };
    }
}

export default OffsetLimit;
