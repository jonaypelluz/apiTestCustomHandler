import { Layout, Menu } from 'antd';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { HomeOutlined, RightSquareOutlined } from '@ant-design/icons';
import { useApiContext } from 'store/ApiContext';

const { Header } = Layout;

const Head = () => {
    const initialItems = [
        {
            label: <Link to="/">Home</Link>,
            icon: <HomeOutlined />,
            key: 'list',
        },
    ];
    const [items, setItems] = useState(initialItems);
    const apiContext = useApiContext();
    const isInitialRender = useRef(true);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
        } else {
            const sections = apiContext.config.sections;
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
        }
    }, [apiContext]);

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
