const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  failOnErrors: true,
  definition: {
    openapi: "3.1.0",
    info: {
      title: "GameShop API",
      version: "1.0.0",
      description: "API for managing a game shop",
    },
    servers: [
      {
        url: "http://localhost:3000/api/v1",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/docs/components.yaml"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};
