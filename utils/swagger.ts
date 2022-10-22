import {Express, Request, Response} from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express';
import {version} from '../package.json';
// import log from 'logger'

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "i-payroll Docs",
            version        
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            }
        ]
    },
    apis: ["../model/*.ts", "../routes/*.ts"],
};   


const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express, port: number) {
    // swagger page
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Docs in json format
    app.get('docs.json', (req:Request, res: Response) => {
        res.setHeader('Content-Type', "application/json");
        res.send(swaggerSpec);
    });
    console.log(`Docs available at http://localhost:${port}/docs`);
}

export default swaggerDocs;