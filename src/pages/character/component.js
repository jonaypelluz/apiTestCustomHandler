import './styles.scss';
import { useParams } from 'react-router-dom';
import { Layout } from 'antd';

const { Content } = Layout;

const Character = () => {
    const { character } = useParams();
    console.log(character);

    return (
        <Content style={{ padding: '0 50px' }}>
            <div className="content">Hello</div>
        </Content>
    );
};

export default Character;
