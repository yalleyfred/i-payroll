"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const empPayload = {
    name: 'Daniel',
    email: "daniel@gmail.com",
    hire_date: '2021-04-08',
    snnit: '6416718979878',
    tin: '641671897987844',
    department: 'Tech',
    job_title: 'level 2',
    status: 'Full-Time'
};
const createEmployees = (emp) => __awaiter(void 0, void 0, void 0, function* () {
    // try {
    //     await Employee.create(emp)
    // }catch(error) {
    // }
});
describe('employees', () => {
    describe('get all employees route', () => {
        describe('given all employee exist', () => {
            it('should return a 200', () => __awaiter(void 0, void 0, void 0, function* () {
                const response = yield (0, supertest_1.default)(app_1.app).get('/api/v1/employees').expect(200);
                //   console.log(response.body);
            }));
        });
        describe('should creating a new employee fails', () => {
            it('return a 500', () => {
                (0, supertest_1.default)(app_1.app).post('/api/v1/employees').expect(500);
            });
        });
    });
});
//# sourceMappingURL=employee.test.js.map