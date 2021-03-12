const {getAllOrganizationsSchema, getOrganizationByIdSchema, createOrganizationSchema} = require('./schema');
const ApiResponse = require('../../../utils/ApiResponse');

let idCounter = 1;
const db = new Map();
db.set(0, {"id": 0, "name": "Test"})

const organizationRoutes = async (app, options) => {
    // Get all Organizations
    app.get('/', {schema: getAllOrganizationsSchema}, async (request, reply) => {
        // Retrieve all Organizations
        const organizations = Array.from(db.values());
        // Create API Response and reply the request
        const res = ApiResponse.ok({organizations});
        reply.code(res.statusCode).send(res.body);
    });

    // Get Organization by ID
    app.get('/:organizationId', {schema: getOrganizationByIdSchema}, async (request, reply) => {
        // Extract 'organizationId' from the request parameters
        const {params: {organizationId}} = request;
        // Attempt to retrieve Organization
        const organization = db.get(organizationId);
        // Create the API Response and reply the request
        let res;
        if (!organization) {
            res = ApiResponse.notFound({organizationId: `Organization with ID '${organizationId}' not found.`});
        } else {
            res = ApiResponse.ok({organization})
        }
        reply.code(res.statusCode).send(res.body);
    });

    // Create Organization
    app.post('/', {schema: createOrganizationSchema}, async (request, reply) => {
        // Extract the Body from the request
        const {body} = request;
        // Create a Organization object
        const id = idCounter++;
        const organization = {
            id: id,
            name: body.name
        }
        // Persist the Organization
        db.set(id, organization);
        // Return the created Organization to the user
        const res = ApiResponse.created({organization});
        reply.code(res.statusCode).send(res.body);
    });
};

module.exports = organizationRoutes;