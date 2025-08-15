const pdfService = require('../services/pdf.service');
const { RESPONSE_MESSAGES } = require('../utils/constants');
const logger = require('../utils/logger');
const ApiResponse = require('../utils/apiResponse');

const generatePdf = async (req, res, next) => {
    const apiResponse = new ApiResponse(res);
    try {
        const inputs = req.body;
        const requiredFields = ['customer_no', 'order_no', 'valid_date', 'coupon_code', 'amount'];
        for (const field of requiredFields) {
            if (!inputs[field]) {
                const message = RESPONSE_MESSAGES[field.toUpperCase() + '_REQUIRED'];
                return apiResponse.badRequest(message);
            }
        }
        const fileName = await pdfService.generatePdf(inputs);
        apiResponse.success({ file: fileName });
    } catch (error) {
        logger.error(error);
        apiResponse.internalError(RESPONSE_MESSAGES.SOMETHING_WENT_WRONG);
    }
};

const downloadPdf = (req, res, next) => {
    const apiResponse = new ApiResponse(res);
    try {
        const filename = req.query.filename;
        if (!filename) {
            return apiResponse.badRequest(RESPONSE_MESSAGES.INVALID_REQUEST);
        }
        const appDir = require('path').dirname(require.main.path.replace(/\bin/g, ""));
        res.download(`${appDir}/uploads/${filename}`, filename);
    } catch (error) {
        logger.error(error);
        apiResponse.internalError(RESPONSE_MESSAGES.SOMETHING_WENT_WRONG);
    }
};

const gentest = async (req, res, next) => {
    const apiResponse = new ApiResponse(res);
    try {
        const fileName = await pdfService.generatePdf("test");
        apiResponse.success({ file: fileName });
    } catch (error) {
        logger.error(error);
        apiResponse.internalError(RESPONSE_MESSAGES.SOMETHING_WENT_WRONG);
    }
};

module.exports = {
    generatePdf,
    downloadPdf,
    gentest
};
