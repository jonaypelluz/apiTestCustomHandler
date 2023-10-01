import './styles.scss';
import { Route, Routes } from 'react-router-dom';
import { Home } from 'pages/home';
import { Character } from 'pages/character';
import { Characters } from 'pages/characters';
import { NotFound } from 'pages/not-found';
import { Header } from 'components/header';
import { Layout } from 'antd';

const App = () => {
    return (
        <Layout>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/characters" element={<Characters />} />
                <Route path="/characters/page/:page" element={<Characters />} />
                <Route path="/characters/:character" element={<Character />} />
                <Route path="*" exact={true} element={<NotFound />} />
            </Routes>
        </Layout>
    );
};

export default App;
