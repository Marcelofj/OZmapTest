import winston from 'winston'
import config from './default'
import { LOGGER_LEVELS, LOGGER_COLORS } from '../enums/logger'

const level = () => {
    const env = config.app.env ?? 'development'
    const isDevelopment = env === 'development'
    return isDevelopment ? 'debug' : 'warning'
}

winston.addColors(LOGGER_COLORS)

const format = winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        info => `${info.timestamp} - ${info.level}: ${info.message}`
    )
)

const transports = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: 'src/logs/info.log',
        level: 'info'
    }),
    new winston.transports.File({
        filename: 'src/logs/error.log',
        level: 'error'
    }),
    new winston.transports.File({
        filename: 'src/logs/all.log'
    })
]

const Logger = winston.createLogger({
    level: level(),
    levels: LOGGER_LEVELS,
    format,
    transports
})

export default Logger