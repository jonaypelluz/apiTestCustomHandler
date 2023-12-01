import './pagination.scss';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Pagination = ({ totalItems, itemsPerPage, currentPage, baseUrl }) => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    if (totalPages <= 1) {
        return null;
    }

    const getPageLinks = () => {
        const pages = [1];

        if (currentPage > 1) {
            pages.push(currentPage - 1);
        }
        if (currentPage !== 1 && currentPage !== totalPages) {
            pages.push(currentPage);
        }
        if (currentPage < totalPages) {
            pages.push(currentPage + 1);
        }

        pages.push(totalPages);
        return [...new Set(pages)];
    };

    return (
        <div className="pagination">
            <Link
                to={`${baseUrl}/${currentPage - 1}`}
                className={currentPage === 1 ? 'disabled' : ''}
            >
                Previous
            </Link>

            {getPageLinks().map((page, index, array) => (
                <Fragment key={page}>
                    <Link
                        to={`${baseUrl}/${page}`}
                        className={currentPage === page ? 'active' : ''}
                    >
                        {page}
                    </Link>
                    {index < array.length - 1 && array[index + 1] - page > 1 && <span>...</span>}
                </Fragment>
            ))}

            <Link
                to={`${baseUrl}/${currentPage + 1}`}
                className={currentPage === totalPages ? 'disabled' : ''}
            >
                Next
            </Link>
        </div>
    );
};

Pagination.propTypes = {
    totalItems: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    currentPage: PropTypes.number.isRequired,
    baseUrl: PropTypes.string.isRequired,
};

export default Pagination;
