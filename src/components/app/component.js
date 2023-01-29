import './styles.scss';
import { Route, Routes } from 'react-router-dom';
import { Home } from 'pages/home';
import { NotFound } from 'pages/not-found';
import { Header } from 'components/header';
import { Layout } from 'antd';

const App = () => {
    return (
        <Layout>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="*" exact={true} element={<NotFound />} />
            </Routes>
        </Layout>
    );
};

export default App;
