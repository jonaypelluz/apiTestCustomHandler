import PaginationAdapter from './PaginationAdapter';

class PageNumberPageSize extends PaginationAdapter {
    getPaginationParams(config, currentPage) {
        return {
            'page[number]': currentPage,
            'page[size]': config.perPage,
        };
    }
}

export default PageNumberPageSize;
