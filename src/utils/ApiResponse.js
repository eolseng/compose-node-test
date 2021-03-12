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
    ok: (data) => {
        return success(200, data);
    },
    created: (data) => {
        return success(201, data);
    },
    accepted: (data) => {
        return success(202, data);
    },
    noContent: () => {
        return success(204, null);
    },

    // Client Error
    badRequest: (data) => {
        return fail(400, data);
    },
    notFound: (data) => {
        return fail(404, data);
    },

    // Server Error
    internalServerError: (message) => {
        return error(500, message);
    },
    notImplemented: (message) => {
        return error(501, message);
    },
    badGateway: (message) => {
        return error(502, message);
    },
    serviceUnavailable: (message) => {
        return error(503, message);
    },
    gatewayTimeout: (message) => {
        return error(504, message);
    },

}

const success = (statusCode, data) => {
    const jSendBody= {
        status: "success",
        statusCode: statusCode,
        data: data
    }
    return {
        statusCode: statusCode,
        body: jSendBody
    }
}

const fail = (statusCode, data) => {
    const jSendBody = {
        status: "fail",
        statusCode: statusCode,
        data: data
    }
    return {
        statusCode: statusCode,
        body: jSendBody
    }
}

const error = (statusCode, message) => {
    const jSendBody = {
        status: "error",
        statusCode: statusCode,
        message: message
    }
    return {
        statusCode: statusCode,
        body: jSendBody
    }
}

module.exports = ApiResponse;