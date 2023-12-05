import { Component } from 'react';
import PropTypes from 'prop-types';
import Logger from 'services/Logger';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        Logger.error(error);
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        Logger.error(error, info.componentStack);
    }

    render() {
        if (this.state.hasError) {
            return typeof this.props.fallback === 'string' ? (
                <div>{this.props.fallback}</div>
            ) : (
                this.props.fallback
            );
        }

        return this.props.children;
    }
}

ErrorBoundary.propTypes = {
    fallback: PropTypes.node.isRequired,
    children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
