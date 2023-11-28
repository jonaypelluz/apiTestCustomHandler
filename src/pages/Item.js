import { useParams } from 'react-router-dom';
import { Layout } from 'antd';

const { Content } = Layout;

const Item = () => {
    const { id } = useParams();
    console.log(id);

    return (
        <Content style={{ padding: '20px 50px' }}>
            <div className="content">Hello</div>
        </Content>
    );
};

export default Item;
