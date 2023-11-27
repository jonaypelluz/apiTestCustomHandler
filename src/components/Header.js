import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { SmileOutlined } from '@ant-design/icons';

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
        <Header style={{ backgroundColor: '#000', height: '78px', paddingInline: '20px' }}>
            <Menu
                style={{ lineHeight: '78px', backgroundColor: '#000' }}
                theme="dark"
                mode="horizontal"
                items={items}
            />
        </Header>
    );
};

export default Head;
