import appConfig from 'config/AppConfig';

const NO_OP = (message, ...optionalParams) => {}; // eslint-disable-line

const config = appConfig();

const COLOR_CYAN = 36;
const COLOR_BLUE = 34;
const COLOR_DEBUG = 30;
const BG_COLOR_DEBUG = 43;

class ConsoleLogger {
    constructor(options = {}) {
        const { level } = options;

        const bindConsoleWithColor = (consoleMethod, fontColor, backgroundColor) => {
            let colorCode = `\x1b[${fontColor}m`;
            if (backgroundColor) {
                colorCode = `\x1b[${fontColor};${backgroundColor}m`;
            }
            return consoleMethod.bind(console, `${colorCode}%s\x1b[0m`);
        };

        this.error = console.error.bind(console);

        if (level === 'error') {
            this.warn = NO_OP;
            this.log = NO_OP;
            this.info = NO_OP;
            this.debug = NO_OP;
            return;
        }

        this.warn = console.warn.bind(console);

        if (level === 'warn') {
            this.log = NO_OP;
            this.info = NO_OP;
            this.debug = NO_OP;
            return;
        }

        this.info = bindConsoleWithColor(console.log, COLOR_CYAN);
        this.log = bindConsoleWithColor(console.log, COLOR_BLUE);
        this.debug = bindConsoleWithColor(console.log, COLOR_DEBUG, BG_COLOR_DEBUG);
    }
}

const Logger = new ConsoleLogger({ level: config.LOG_LEVEL ?? 'error' });

export default Logger;
