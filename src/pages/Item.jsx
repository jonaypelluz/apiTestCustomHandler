import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Layout } from 'antd';
import ApiService from 'services/ApiService';
import Loader from 'components/Loader';
import Toast from 'components/Toast';
import Logger from 'services/Logger';
import { useSectionContext } from 'store/SectionContext';
import ItemInfoCard from 'components/ItemInfoCard';
import ErrorBoundary from 'components/ErrorBoundary';

const { Content } = Layout;

const Item = () => {
    const sectionContext = useSectionContext();
    const api = ApiService();

    const { id } = useParams();
    const { config } = useSelector((state) => state.apiConfig);

    const [error, setError] = useState('');
    const [item, setItem] = useState('');

    const itemIncludedKeys = config[sectionContext.selectedSection].itemIncludedKeys;

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const result = await api.getItem(config, sectionContext.selectedSection, id);
                Logger.log('Final item: ', result);
                setItem(result);
            } catch (error) {
                setError(error);
            }
        };

        fetchItem();
    }, []);

    if (api.loading || item === '') {
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
        <Content style={{ padding: '20px 50px' }}>
            <ErrorBoundary fallback="Something went wrong...">
                <ItemInfoCard item={item} itemIncludedKeys={itemIncludedKeys} />
            </ErrorBoundary>
        </Content>
    );
};

export default Item;
