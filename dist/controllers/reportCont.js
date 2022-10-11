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
exports.createReport = void 0;
const XLSX = __importStar(require("xlsx"));
const path_1 = __importDefault(require("path"));
const payrollModel_1 = require("../model/payrollModel");
const Database_1 = __importDefault(require("../Database"));
const createReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, payrollModel_1.PayrollMap)(Database_1.default);
        const workSheetColumnName = [
            "name",
            "job_title",
            "basic_salary",
            "allowance"
        ];
        const workSheetName = "Payroll";
        const filePath = './report/payroll.xlsx';
        // const payrollList = async() => {
        //     return await Payroll.findAll();
        // } 
        // const list = await payrollList().then(el => {return el}
        // );
        // console.log(list);
        const payrollList = [
            {
                "name": "dan",
                "job_title": "level 1",
                "basic_salary": 1100,
                "allowance": 200
            },
            {
                "name": "fred",
                "job_title": "level 2",
                "basic_salary": 1100,
                "allowance": 200
            }
        ];
        const exportPayrollToExcel = (payrollList, workSheetColumnName, workSheetName, filePath) => {
            const data = payrollList.map(payroll => {
                return [payroll.name, payroll.job_title, payroll.basic_salary, payroll.allowance];
            });
            const workBook = XLSX.utils.book_new();
            const workSheetData = [
                workSheetColumnName,
                ...data
            ];
            const workSheet = XLSX.utils.json_to_sheet(workSheetData);
            XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
            XLSX.writeFile(workBook, path_1.default.resolve(filePath));
            return true;
        };
        exportPayrollToExcel(payrollList, workSheetColumnName, workSheetName, filePath);
        console.log(exportPayrollToExcel);
        res.send("ok");
    }
    catch (error) {
    }
});
exports.createReport = createReport;
//# sourceMappingURL=reportCont.js.map