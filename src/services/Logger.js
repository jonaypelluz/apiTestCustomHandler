import appConfig from 'config/AppConfig';

const NO_OP = (message, ...optionalParams) => {}; // eslint-disable-line

const config = appConfig();

const COLOR_CYAN = 36;
const COLOR_BLUE = 34;

class ConsoleLogger {
    constructor(options = {}) {
        const { level } = options;

        const bindConsoleWithColor = (consoleMethod, color) => {
            return consoleMethod.bind(console, `\x1b[${color}m%s\x1b[0m`);
        };

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

        this.info = bindConsoleWithColor(console.log, COLOR_CYAN);
        this.log = bindConsoleWithColor(console.log, COLOR_BLUE);
    }
}

const logger = new ConsoleLogger({ level: config.LOG_LEVEL ?? 'error' });

export default logger;
