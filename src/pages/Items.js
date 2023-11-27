import { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Layout } from 'antd';
import { useApiContext } from 'store/ApiContext';
import useGatherResponse from 'helpers/useGatherResponse';
import ApiService from 'services/ApiService';
// import { Loader } from 'components/loader';
// import { Grid } from 'components/grid';
// import useConvert from 'helpers/useConvert';
// import { Toast } from 'components/toast';
// import { Pagination } from 'components/pagination';

const { Content } = Layout;

const Characters = () => {
    const [items, setItems] = useState([]);
    const apiContext = useApiContext();
    const api = ApiService();
    const params = useParams();
    console.log(params);
    const location = useLocation();
    const route = location.pathname.slice(1);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await api.getItems(apiContext.config, route, params);
                const results = useGatherResponse(apiContext.config[route].keys, response);
                setItems(results);
            } catch (error) {
                console.error(error);
            }
        };

        fetchItems();
    }, []);

    // if (loading) {
    //     return <Loader />;
    // }

    // if (error) {
    //     return (
    //         <Toast
    //             toastList={[
    //                 {
    //                     type: 'error',
    //                     description: error.message,
    //                 },
    //             ]}
    //         />
    //     );
    // }

    const characters = useConvert(items.results, apiContext.config[route].conversions);

    return (
        <Content style={{ padding: '20px 50px', backgroundColor: '#fff' }}>
            <Grid items={characters} />
            <Pagination
                totalItems={items.count}
                itemsPerPage={30}
                currentPage={currentPage}
                baseUrl="/characters/page"
            />
        </Content>
    );
};

export default Characters;
