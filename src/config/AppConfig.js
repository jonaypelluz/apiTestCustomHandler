const appConfig = () => {
    switch (process.env.REACT_APP_APP_ENV) {
        case 'development':
            return {
                LOG_LEVEL: 'info',
            };
        default:
            throw new Error(`Invalid REACT_APP_APP_ENV "${process.env.REACT_APP_APP_ENV}"`);
    }
};

export default appConfig;
