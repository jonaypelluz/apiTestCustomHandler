import { Card } from 'antd';
import PropTypes from 'prop-types';

const { Meta } = Card;

const ImageCard = ({ item }) => (
    <Card
        hoverable
        style={{
            width: 240
        }}
        cover={<img alt={item.title} src={item.image} />}>
        <Meta title={item.title} description={item.desc} />
    </Card>
);

ImageCard.propTypes = {
    item: PropTypes.object
};

export default ImageCard;
