import ImageCard from 'components/ImageCard';
import { Layout, Col, Row } from 'antd';
import PropTypes from 'prop-types';

const { Content } = Layout;

const Grid = ({ items }) => {
    return (
        <Content>
            <Row>
                {items.map((item, idx) => (
                    <Col style={{ margin: '10px' }} key={idx}>
                        <ImageCard item={item} />
                    </Col>
                ))}
            </Row>
        </Content>
    );
};

Grid.propTypes = {
    items: PropTypes.array.isRequired,
};

export default Grid;
