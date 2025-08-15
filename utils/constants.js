const RESPONSE_MESSAGES = {
    CUSTOMER_NO_REQUIRED: 'Customer number is required.',
    ORDER_NO_REQUIRED: 'Order number is required.',
    VALID_DATE_REQUIRED: 'Valid until date is required.',
    COUPON_CODE_REQUIRED: 'Coupon code is required.',
    AMOUNT_REQUIRED: 'Amount is required.',
    INVALID_REQUEST: 'Invalid request.',
    SOMETHING_WENT_WRONG: 'Something went wrong.',
};

const HTTP_STATUS_CODES = {
    OK: 200,
    BAD_REQUEST: 400,
    INTERNAL_SERVER_ERROR: 500,
};

module.exports = {
    RESPONSE_MESSAGES,
    HTTP_STATUS_CODES,
};
