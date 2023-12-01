import appConfig from 'config/AppConfig';

const NO_OP = (message, ...optionalParams) => {}; // eslint-disable-line

const config = appConfig();

class ConsoleLogger {
    constructor(options = {}) {
        const { level } = options;

        this.error = console.error.bind(console);

        if (level === 'error') {
            this.warn = NO_OP;
            this.log = NO_OP;
            this.info = NO_OP;
            return;
        }

        this.warn = console.warn.bind(console);

        if (level === 'warn') {
            this.log = NO_OP;
            this.info = NO_OP;
            return;
        }

        this.info = (message, ...optionalParams) => {
            console.log(`\x1b[36m${message}\x1b[0m`, ...optionalParams); // eslint-disable-line
        };
        this.log = (message, ...optionalParams) => {
            console.log(`\x1b[34m${message}\x1b[0m`, ...optionalParams); // eslint-disable-line
        };
    }
}

const logger = new ConsoleLogger({ level: config.LOG_LEVEL ?? 'error' });

export default logger;
