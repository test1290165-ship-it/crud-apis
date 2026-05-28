const swaggerJsdoc = require("swagger-jsdoc")
 
const options = {
definition: {
openapi: "3.0.0",
info: {
title: "My APIssss",
version: "1.0.0",
description: "API Documentation",
},
servers: [
{
url: "http://localhost:9000",
},
],
},
apis: ["./routes/*.js"], // routes folder scan karega
}
 
const swaggerSpec = swaggerJsdoc(options)
 
module.exports = swaggerSpec