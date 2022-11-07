"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const dotenv_1 = __importDefault(require("dotenv"));
const Database_1 = __importDefault(require("./Database"));
dotenv_1.default.config();
// if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const port = process.env.PORT;
if (process.env.NODE_ENV === 'production') {
    // app.use(express.static(path.join(__dirname, "./client/build")));
    // app.get('*', (req: Request, res: Response) => {
    // 	res.sendFile(path.resolve(__dirname, "./", 'client', 'build', 'index.html'));
    // });
    Database_1.default.authenticate().then(() => {
        console.log('connected to production database successfully!');
    }).catch(error => {
        console.log('DB connection for production failed');
    });
    console.log('prod');
}
else {
    // app.use(express.static(path.join(__dirname, "..//client//build")));
    // app.get('*', (req: Request, res: Response) => {
    // 	res.sendFile(path.resolve(__dirname, "..//", 'client', 'build', 'index.html'));
    // });
    Database_1.default.authenticate().then(() => {
        console.log('connected to database successfully!');
    }).catch(error => {
        console.log('DB connection failed');
    });
}
app_1.app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
//# sourceMappingURL=server.js.map