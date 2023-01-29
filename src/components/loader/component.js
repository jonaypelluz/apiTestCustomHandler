import './styles.scss';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const LoadingIcon = <LoadingOutlined style={{ fontSize: 64 }} spin />;

const Loader = () => {
    return (
        <div className="loader">
            <Spin indicator={LoadingIcon} />
        </div>
    );
};

export default Loader;
