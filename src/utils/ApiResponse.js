/*
    Based on JSend: https://github.com/omniti-labs/jsend
    Wraps the response body in a given type, according to the JSendResponse interface.
    All request responses will include a JSON response body with a 'status' and 'statusCode'.
    Any payload will be wrapped under a 'data' key.
    The three response statuses:
        * "success" - Success - messages in the 200 range
            * Contains a 'data' object with the response.
            * Usage:
                CORRECT: ApiResponse.ok({organization: {id: 1, name: "My Organization"}})
                WRONG  : ApiResponse.ok({id: 1, name: "My Organization"})
        * "fail" - Client Error - messages in the 400 range
            * Contains a 'data' object describing what went wrong.
            * Usage:
                CORRECT: ApiResponse.badRequest({id: "Could not find organization with ID 45"})
                WRONG  : ApiResponse.badRequest({message: "Could not find organization with ID 45"})
        * "error" - Server Error - messages in the 500 range
            * Contains a message describing the error
 */


const ApiResponse = {
    // Success
    ok: (reply, key, value) => {
        const statusCode = 200;
        const body = JSendFactory.success(key, value);
        return reply.code(statusCode).send(body);
    },
    created: (reply, key, value) => {
        const statusCode = 201;
        const body = JSendFactory.success(key, value);
        return reply.code(statusCode).send(body);
    },
    accepted: (reply, key, value) => {
        const statusCode = 202;
        const body = JSendFactory.success(key, value);
        return reply.code(statusCode).send(body);
    },
    noContent: (reply) => {
        const statusCode = 204;
        return reply.code(statusCode).send();
    },

    // Client Error
    badRequest: (reply, key, value) => {
        const statusCode = 400;
        const body = JSendFactory.fail(key, value);
        return reply.code(statusCode).send(body);
    },
    notFound: (reply, key, value) => {
        const statusCode = 404;
        const body = JSendFactory.fail(key, value);
        return reply.code(statusCode).send(body);
    },

    // Server Error
    internalServerError: (reply, message) => {
        const statusCode = 500;
        const body = JSendFactory.error(message);
        return reply.code(statusCode).send(body);
    },
    notImplemented: (reply, message) => {
        const statusCode = 501;
        const body = JSendFactory.error(message);
        return reply.code(statusCode).send(body);
    },
    badGateway: (reply, message) => {
        const statusCode = 502;
        const body = JSendFactory.error(message);
        return reply.code(statusCode).send(body);
    },
    serviceUnavailable: (reply, message) => {
        const statusCode = 503;
        const body = JSendFactory.error(message);
        return reply.code(statusCode).send(body);
    },
    gatewayTimeout: (reply, message) => {
        const statusCode = 504;
        const body = JSendFactory.error(message);
        return reply.code(statusCode).send(body);
    },
}

const JSendFactory = {
    success: (key, value) => {
        return {
            status: "success",
            data: {[key]: value}
        };
    },
    fail: (key, value) => {
        return {
            status: "fail",
            data: {[key]: value}
        }
    },
    error: (message) => {
        return {
            status: "error",
            message: message
        }
    }
}

module.exports = ApiResponse;