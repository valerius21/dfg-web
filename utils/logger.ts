const pino = require('pino')()

export const logger = pino({
	transport: {
		target: 'pino-pretty',
		options: {
			colorize: true,
		}
	}
})
