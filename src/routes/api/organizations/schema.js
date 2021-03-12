const organizationProperties = {
    id: {type: 'number'},
    name: {type: 'string', minLength: 1, maxLength: 255},
}

const responseTemplate = (properties) => {
    return {
        type: 'object',
        properties: {
            status: {type: 'string'},
            statusCode: {type: 'number'},
            data: {
                type: 'object',
                properties: properties
            }
        }
    }
}

const getOrganizationByIdSchema = {
    params: {
        type: 'object',
        required: ['organizationId'],
        properties: {
            organizationId: {type: 'number'}
        },
    },
    response: {
        200: responseTemplate({
            organization: {
                type: 'object',
                properties: organizationProperties
            }
        })
    }
}

const getAllOrganizationsSchema = {
    response: {
        200: responseTemplate({
            organizations: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: organizationProperties
                }
            }
        })
    }
}

const createOrganizationSchema = {
    body: {
        required: ['name'],
        properties: organizationProperties,
    },
    response: {
        201: responseTemplate({
            organization: {
                type: 'object',
                properties: organizationProperties
            }
        })
    }
}

module.exports = {
    getOrganizationByIdSchema,
    getAllOrganizationsSchema,
    createOrganizationSchema
};