"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const package_json_1 = require("../package.json");
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'I-payroll',
            description: 'I-payroll API Docs',
            version: package_json_1.version,
            servers: ["http://localhost:5000", "https://i-payroll.onrender.com"]
        }
    },
    apis: ['./model/*.ts', './routes/*.ts']
};
exports.default = swaggerOptions;
//# sourceMappingURL=swagger.js.map