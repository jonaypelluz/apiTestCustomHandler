import './styles.scss';
import { useParams } from 'react-router-dom';
import { Layout } from 'antd';
import { useQuery } from '@apollo/client';
import { Loader } from 'components/loader';
import { Grid } from 'components/grid';
import useConvert from 'helpers/useConvert';
import { CHARACTERS_QUERY, ITEMS_PER_PAGE } from 'services/api/rick-and-morty';
import { Toast } from 'components/toast';
import { Pagination } from 'components/pagination';

const { Content } = Layout;

const Characters = () => {
    const { page } = useParams();
    const currentPage = page ? parseInt(page) : 1;

    const { data, loading, error } = useQuery(CHARACTERS_QUERY.gql, {
        variables: { ...CHARACTERS_QUERY.params, page: currentPage },
    });

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <Toast
                toastList={[
                    {
                        type: 'error',
                        description: error.message,
                    },
                ]}
            />
        );
    }

    const totalItems = data[CHARACTERS_QUERY.key].info.count;
    const characters = useConvert(data[CHARACTERS_QUERY.key].results, CHARACTERS_QUERY.conversions);

    return (
        <Content style={{ padding: '0 50px' }}>
            <div className="content">
                <Grid items={characters} />
                <Pagination
                    totalItems={totalItems}
                    itemsPerPage={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    baseUrl="/characters/page"
                />
            </div>
        </Content>
    );
};

export default Characters;
