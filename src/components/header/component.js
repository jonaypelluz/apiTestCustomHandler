import './styles.scss';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';
import { APP_NAME, LOGO_URL } from 'services/api/rick-and-morty';

const { Header } = Layout;

const items = [
    {
        label: <Link to="/characters">Characters</Link>,
        icon: <SmileOutlined />,
        key: 'list',
    },
];

const Head = () => {
    return (
        <Header className="header">
            <a href="/" title={APP_NAME}>
                <img className="logo" src={LOGO_URL} alt={APP_NAME} />
            </a>
            <Menu className="menu" theme="dark" mode="horizontal" items={items} />
        </Header>
    );
};

export default Head;
