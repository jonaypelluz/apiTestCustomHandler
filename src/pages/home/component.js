import './styles.scss';
import { Layout } from 'antd';
import { useQuery } from '@apollo/client';
import { Loader } from 'components/loader';
import { Grid } from 'components/grid';
import useConvert from 'helpers/useConvert';
import { CHARACTERS_QUERY } from 'services/api/rick-and-morty';
import { Toast } from 'components/toast';

const { Content } = Layout;

const Home = () => {
    const { data, loading, error } = useQuery(CHARACTERS_QUERY.gql, CHARACTERS_QUERY.variables);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <Toast
                toastList={[
                    {
                        type: 'error',
                        description: error.message
                    }
                ]}
            />
        );
    }

    const characters = useConvert(data[CHARACTERS_QUERY.key].results, CHARACTERS_QUERY.type);

    return (
        <Content style={{ padding: '0 50px' }}>
            <div className="hero">
                <img src="/images/home.png" alt={process.env.REACT_APP_NAME} />
            </div>
            <div className="content">
                <Grid items={characters} />
            </div>
        </Content>
    );
};

export default Home;
