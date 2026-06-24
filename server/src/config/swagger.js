const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'College ERP API',
      version: '1.0.0',
      description: 'College ERP System Backend API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },

  apis: [
    path.join(process.cwd(), 'src/routes/*.js'),
  ],
};

const swaggerSpec = swaggerJsdoc(options);

console.log('Swagger found paths:');
console.log(Object.keys(swaggerSpec.paths || {}));

module.exports = swaggerSpec;