import { Card } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const { Meta } = Card;

const ImageCard = ({ item }) => (
    <Link to={item.id}>
        <Card
            hoverable
            style={{
                width: 240,
            }}
            cover={<img alt={item.title} src={item.image ?? '/images/default.jpeg'} />}
        >
            <Meta title={item.title} description={item.desc} />
        </Card>
    </Link>
);

ImageCard.propTypes = {
    item: PropTypes.object,
};

export default ImageCard;
