import { ImageCard } from 'components/card';
import { Col, Row } from 'antd';
import PropTypes from 'prop-types';

const Grid = ({ items }) => {
    return (
        <Row
            gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32
            }}>
            {items.map((item, idx) => (
                <Col flex="1 0 20%" className="gutter-row" key={idx}>
                    <ImageCard
                        item={item}
                    />
                </Col>
            ))}
        </Row>
    );
};

Grid.propTypes = {
    items: PropTypes.array.isRequired
};

export default Grid;
