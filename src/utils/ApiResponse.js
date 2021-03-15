/*
    Creates JSend (https://github.com/omniti-labs/jsend) responses for Fastify (https://www.fastify.io/)

    Payloads are wrapped under the data field.
    The key is the singular or plural form of the object type returned.
    The value is the returned data, either as a single object or a list of objects.

    Example response body:
    {
        status: "success",
        data: {
            "organization": {id: 0, name: "My Organization"}
        }
    }

    Any payload will be wrapped under a 'data' key.
    The three response statuses:
        * "success" - Success - messages in the 200 range
            * Contains a 'data' object with the response.
            * Usage:
                CORRECT: ApiResponse.ok(reply, "organization", {id: 0, name: "My Organization"});
                CORRECT: ApiResponse.ok(
                    reply, "organizations", [
                        {id: 0, name: "My Organization"},
                        {id: 1, name: "Another organization}
                    ]
                );
                WRONG  : ApiResponse.ok({id: 0, name: "My Organization"});
                WRONG  : ApiResponse.ok([{id: 0, name: "My Organization"}, {id: 1, name: "Another organization}]);
        * "fail" - Client Error - messages in the 400 range
            * Contains a 'data' object describing what went wrong.
            * Usage:
                CORRECT: ApiResponse.badRequest(reply, "organization", {id: "Could not find organization with ID 45"})
                WRONG  : ApiResponse.badRequest({id: "Could not find organization with ID 45"})
        * "error" - Server Error - messages in the 500 range
            * Contains a message describing the error
            * Usage:
                CORRECT: "ApiResponse.internalServerError(reply, "The server failed to connect to the database");
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
        };
    },
    error: (message) => {
        return {
            status: "error",
            message: message
        };
    },
}

module.exports = ApiResponse;