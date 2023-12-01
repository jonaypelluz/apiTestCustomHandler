import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { useApiContext } from 'store/ApiContext';
import useGatherResponse from 'helpers/useGatherResponse';
import useConvert from 'helpers/useConvert';
import ApiService from 'services/ApiService';
import Grid from 'components/Grid';
import Pagination from 'components/Pagination';
import Loader from 'components/Loader';
import Toast from 'components/Toast';

const Items = () => {
    const [error, setError] = useState();
    const [items, setItems] = useState({ results: [], count: 0 });
    const apiContext = useApiContext();
    const api = ApiService();
    const params = useParams();
    const currentPage = 'page' in params ? parseInt(params.page) : 1;
    const location = useLocation();
    const route = location.pathname.split('/')[1];
    const hasPagination = apiContext.config[route].pagination !== '';
    const perPage = apiContext.config[route].perPage > 0 ? apiContext.config[route].perPage : 0;

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await api.getItems(apiContext.config, route, params);
                let results = useGatherResponse(apiContext.config[route].keys, response);
                results.results = useConvert(results.results, apiContext.config[route].conversions);
                setItems(results);
            } catch (error) {
                setError(error);
            }
        };

        fetchItems();
    }, [currentPage]);

    if (api.loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <Toast
                toastList={[
                    {
                        type: 'error',
                        description: error,
                    },
                ]}
            />
        );
    }

    return (
        <Layout style={{ padding: '20px 50px', backgroundColor: '#fff' }}>
            <Grid items={items.results} />
            {hasPagination && (
                <Pagination
                    totalItems={items.count}
                    itemsPerPage={perPage}
                    currentPage={currentPage}
                    baseUrl={`/${route}/page`}
                />
            )}
        </Layout>
    );
};

export default Items;
