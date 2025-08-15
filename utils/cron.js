const nodemailer = require('nodemailer');
const winston = require('winston');
require('winston-daily-rotate-file');
const logger = require('./logger');

const transport = new winston.transports.DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '14d',
    level: 'error'
});

transport.on('rotate', function(oldFilename, newFilename) {
    // do something fun
});

const emailTransport = new winston.transports.Mail({
    to: 'your-email@example.com',
    from: 'error-bot@example.com',
    subject: 'Error in Coupon Generator',
    level: 'error',
    tls: {
        rejectUnauthorized: false
    },
    html: true
});

logger.add(transport);
// logger.add(emailTransport); // Uncomment this line to enable email notifications

const checkLogsAndSendEmail = () => {
    // This is a placeholder for a more robust cron job implementation
    // For a real application, you would use a library like node-cron
    setInterval(() => {
        // In a real application, you would have logic here to check for new errors
        // and send an email if necessary.
        // For this example, we will just log a message to the console.
        logger.info('Checking for new errors...');
    }, 60000);
};

module.exports = {
    checkLogsAndSendEmail
};
