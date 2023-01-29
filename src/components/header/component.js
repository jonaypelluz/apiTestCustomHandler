import './styles.scss';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';

const { Header } = Layout;

const items = [
    {
        label: <Link to="/characters">Characters</Link>,
        icon: <SmileOutlined />,
        key: 'list'
    }
];

const Head = () => {
    return (
        <Header className="header">
            <img className="logo" src="/images/RickAndMorty.png" alt={process.env.REACT_APP_NAME} />
            <Menu className="menu" theme="dark" mode="horizontal" items={items} />
        </Header>
    );
};

export default Head;
