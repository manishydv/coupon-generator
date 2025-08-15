class ApiResponse {
    constructor(res) {
        this.res = res;
    }

    send(statusCode, data, message) {
        this.res.status(statusCode).json({
            status: statusCode,
            data: data,
            message: message,
        });
    }

    success(data, message = 'Success') {
        this.send(200, data, message);
    }

    created(data, message = 'Created') {
        this.send(201, data, message);
    }

    badRequest(message = 'Bad Request') {
        this.send(400, null, message);
    }

    unauthorized(message = 'Unauthorized') {
        this.send(401, null, message);
    }

    forbidden(message = 'Forbidden') {
        this.send(403, null, message);
    }

    notFound(message = 'Not Found') {
        this.send(404, null, message);
    }

    internalError(message = 'Internal Server Error') {
        this.send(500, null, message);
    }
}

module.exports = ApiResponse;
