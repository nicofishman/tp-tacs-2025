import winston from "winston";

export const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp({
      format: "YYYY-MM-DD HH:mm:ss:SSS",
    }),
    winston.format.printf(({ level, message, timestamp, route }) => {
      const routeInfo = route ? ` - ${route}` : "";
      return `[${level.toUpperCase()}] ${timestamp}${routeInfo} - ${message}`;
    }),
  ),
  transports: [
    new winston.transports.File({
      filename: "logs/logs.log",
    }),
  ],
});

// Create a logger wrapper that automatically includes route information
export const createContextualLogger = (request: Request) => {
  const route = `${request.method} ${new URL(request.url).pathname}`;

  return {
    debug: (message: string) => logger.debug(message, { route }),
    error: (message: string) => logger.error(message, { route }),
    info: (message: string) => logger.info(message, { route }),
    warn: (message: string) => logger.warn(message, { route }),
  };
};
