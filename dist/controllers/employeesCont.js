"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteEmployee = exports.updateEmployee = exports.createEmployee = exports.getEmployee = exports.getAllEmployees = void 0;
const employeeModel_1 = __importStar(require("../model/employeeModel"));
const errorUtils_1 = require("../utils/errorUtils");
const Database_1 = __importDefault(require("../Database"));
const getAllEmployees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, employeeModel_1.EmployeeMap)(Database_1.default);
        const result = yield employeeModel_1.default.findAll();
        res.status(200).json({ employee: result });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.getAllEmployees = getAllEmployees;
const getEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, employeeModel_1.EmployeeMap)(Database_1.default);
        const id = Number(req.params.id);
        const result = yield employeeModel_1.default.findByPk(id);
        res.status(200).json({ employee: result });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.getEmployee = getEmployee;
const createEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, employeeModel_1.EmployeeMap)(Database_1.default);
        const employee = req.body;
        if (!employee.name || !employee.email || !employee.job_title || !employee.hire_date || !employee.department
            || !employee.status || !employee.snnit || !employee.tin) {
            throw new Error("Please fill all fields!");
        }
        const emp = yield employeeModel_1.default.findOne({
            where: {
                email: employee.email
            }
        });
        const existingEmp = emp === null || emp === void 0 ? void 0 : emp.email;
        if (employee.email == existingEmp) {
            throw new Error("Employee already exist!");
        }
        const result = yield employeeModel_1.default.create(employee);
        res.status(201).json({ employee: result });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.createEmployee = createEmployee;
const updateEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.updateEmployee = updateEmployee;
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.deleteEmployee = deleteEmployee;
//# sourceMappingURL=employeesCont.js.map