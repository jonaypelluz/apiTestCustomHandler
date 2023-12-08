import { Layout, Menu } from 'antd';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined, RightSquareOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Header } = Layout;

const Head = () => {
    const initialItems = [
        {
            label: <Link to="/">CraftAPIxplorer</Link>,
            icon: <HomeOutlined />,
            key: 'list',
        },
    ];
    const [items, setItems] = useState(initialItems);
    const { sections, appName } = useSelector((state) => state.apiConfig);

    useEffect(() => {
        let newItems = [];
        if (sections) {
            newItems = sections.map((section) => ({
                label: (
                    <Link to={`/${section}`}>
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </Link>
                ),
                icon: <RightSquareOutlined />,
                key: section.toLowerCase(),
            }));
            setItems([...initialItems, ...newItems]);
        }
    }, [appName]);

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
