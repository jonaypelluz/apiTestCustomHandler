import PaginationAdapter from './PaginationAdapter';

class PageNumber extends PaginationAdapter {
    // eslint-disable-next-line no-unused-vars
    getPaginationParams(config, currentPage) {
        return {
            page: currentPage,
        };
    }
}

export default PageNumber;
