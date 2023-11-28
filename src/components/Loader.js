import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;

const Loader = () => {
    return (
        <div style={{ width: '100%', textAlign: 'center', padding: '50px' }}>
            <Spin indicator={LoadingIcon} />
        </div>
    );
};

export default Loader;
