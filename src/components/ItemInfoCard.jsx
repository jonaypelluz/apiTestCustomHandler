import { Card, Typography } from 'antd';
import stringToCapitalize from 'helpers/stringToCapitalize';
import PropTypes from 'prop-types';

const { Title, Text } = Typography;

const ItemInfoCard = ({ item, itemIncludedKeys }) => {
    const itemToString = (obj, includedKeys = [], includeChildProps = false) => {
        if (typeof obj === 'object' && obj !== null) {
            return Object.keys(obj).map((key) =>
                includeChildProps || includedKeys.length === 0 || includedKeys.includes(key) ? (
                    <div key={key}>
                        {includeChildProps ? (
                            ''
                        ) : (
                            <Text strong>{stringToCapitalize(key.replace(/_/g, ' '))}: </Text>
                        )}
                        {itemToString(obj[key], includedKeys, true)}
                    </div>
                ) : null,
            );
        } else {
            return <Text>{obj}</Text>;
        }
    };

    return (
        <Card>
            <div style={{ display: 'flex' }}>
                <div style={{ flex: 1, paddingRight: '16px' }}>
                    <img
                        src={item && item.image ? item.image : '/images/default.png'}
                        alt="Card"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </div>
                <div className="item-info-card-text" style={{ flex: 1 }}>
                    <Title>{item.title}</Title>
                    {itemToString(item, itemIncludedKeys)}
                </div>
            </div>
        </Card>
    );
};

ItemInfoCard.propTypes = {
    item: PropTypes.object,
    itemIncludedKeys: PropTypes.array,
};

export default ItemInfoCard;
