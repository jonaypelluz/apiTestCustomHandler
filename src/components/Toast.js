import './toast.scss';
import { useState, useEffect, createElement } from 'react';
import PropTypes from 'prop-types';
import {
    InfoCircleOutlined,
    WarningOutlined,
    CheckCircleOutlined,
    NotificationOutlined,
} from '@ant-design/icons';

const TOAST_STATES = {
    info: NotificationOutlined,
    danger: WarningOutlined,
    warning: InfoCircleOutlined,
    success: CheckCircleOutlined,
};

const AUTO_DELETE_TIME = 5000;

const Toast = (props) => {
    const { toastList } = props;
    const [list, setList] = useState(toastList);
    let interval = null;

    useEffect(() => {
        if (toastList.length > 0) {
            interval = setInterval(() => {
                deleteToast(toastList[0].id);
            }, AUTO_DELETE_TIME);
        }

        return () => {
            clearInterval(interval);
        };
    }, [toastList, list]);

    useEffect(() => {
        setList([...toastList]);
    }, [toastList]);

    const getIcon = (type) => {
        return createElement(TOAST_STATES[type]);
    };

    const deleteToast = (id) => {
        const listItemIndex = list.findIndex((e) => e.id === id);
        const toastListItem = toastList.findIndex((e) => e.id === id);
        list.splice(listItemIndex, 1);
        toastList.splice(toastListItem, 1);
        setList([...list]);
    };

    return (
        <div className="toast-container">
            {list.map((toast, idx) => (
                <div key={idx} className={`toast ${toast.type}`}>
                    <button>X</button>
                    <div className="toast-icon">{getIcon(toast.type)}</div>
                    <div>
                        <p className="toast-title">
                            {toast.type.charAt(0).toUpperCase() + toast.type.slice(1)}
                        </p>
                        <p className="toast-message">{toast.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

Toast.defaultProps = {
    position: 'bottom-right',
};

Toast.propTypes = {
    toastList: PropTypes.array.isRequired,
    position: PropTypes.string,
};

export default Toast;
