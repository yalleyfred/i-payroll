import {version} from '../package.json';


const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: 'I-payroll',
            description: 'I-payroll API Docs',
            version,
            servers: ["http://localhost:5000", "https://i-payroll.onrender.com"]
      }
    },
    apis: ['./model/*.ts', './routes/*.ts']
  };

  export default swaggerOptions;