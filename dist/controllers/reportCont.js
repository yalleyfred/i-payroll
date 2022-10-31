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
exports.createSnnitReport = exports.createGraReport = exports.createPayReport = void 0;
const errorUtils_1 = require("../utils/errorUtils");
const path_1 = __importDefault(require("path"));
const payrollModel_1 = __importStar(require("../model/payrollModel"));
const taxModel_1 = __importStar(require("../model/taxModel"));
const snnitModel_1 = __importStar(require("../model/snnitModel"));
const Database_1 = require("../Database");
const XLSX = __importStar(require("xlsx"));
const createPayReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = { date: req.params.month };
        (0, payrollModel_1.PayrollMap)(Database_1.Database);
        console.log(date);
        const workSheetColumnName = [
            "name",
            "job_title",
            "email",
            "date",
            "basic_wage",
            "allowance",
            "bonus",
            "income_tax",
            "bonus_tax",
            "teir_one",
            "teir_two",
            "loan_deduction",
            "total_deduction",
            "net_salary",
        ];
        const workSheetName = "Payroll";
        const filePath = path_1.default.join(__dirname, '../../report/payroll.xlsx');
        const payrollList = yield payrollModel_1.default.findAll({
            where: {
                date: date.date
            }
        });
        if (payrollList.length < 1 || payrollList == undefined) {
            throw new Error("There is no payroll with for this date");
        }
        const exportPayrollToExcel = (payrollList, workSheetColumnName, workSheetName, filePath) => {
            const data = payrollList.map((payroll) => {
                return [
                    payroll.name,
                    payroll.job_title,
                    payroll.email,
                    payroll.date,
                    payroll.basic_wage,
                    payroll.allowance,
                    payroll.bonus,
                    payroll.income_tax,
                    payroll.bonus_tax,
                    payroll.teir_one,
                    payroll.teir_two,
                    payroll.loan_deduction,
                    payroll.total_deduction,
                    payroll.net_salary,
                ];
            });
            const workBook = XLSX.utils.book_new();
            const workSheetData = [workSheetColumnName, ...data];
            const workSheet = XLSX.utils.json_to_sheet(workSheetData);
            XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
            XLSX.writeFile(workBook, path_1.default.resolve(filePath), { type: "buffer" });
            return workSheet;
        };
        exportPayrollToExcel(payrollList, workSheetColumnName, workSheetName, filePath);
        res.status(200).sendFile(filePath);
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.createPayReport = createPayReport;
const createGraReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = { date: req.params.month };
        (0, taxModel_1.TaxMap)(Database_1.Database);
        const workSheetColumnName = [
            "name",
            "tin",
            "date",
            "basic_salary",
            "tax_relief",
            "net_taxable_pay",
            "total_tax_deduction",
        ];
        const workSheetName = "Tax Filling";
        const filePath = path_1.default.join(__dirname, '../../report/taxReport.xlsx');
        const TaxList = yield taxModel_1.default.findAll({
            where: {
                date: date.date
            }
        });
        if (TaxList.length < 1) {
            throw new Error("There is no payroll with for this date");
        }
        const exportPayrollToExcel = (payrollList, workSheetColumnName, workSheetName, filePath) => {
            const data = payrollList.map((tax) => {
                return [
                    tax.name,
                    tax.tin,
                    tax.date,
                    tax.basic_salary,
                    tax.tax_relief,
                    tax.net_taxable_pay,
                    tax.total_tax_deduction
                ];
            });
            const workBook = XLSX.utils.book_new();
            const workSheetData = [workSheetColumnName, ...data];
            const workSheet = XLSX.utils.json_to_sheet(workSheetData);
            XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
            XLSX.writeFile(workBook, path_1.default.resolve(filePath), { type: "buffer" });
            return workSheet;
        };
        exportPayrollToExcel(TaxList, workSheetColumnName, workSheetName, filePath);
        res.status(200).sendFile(filePath);
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.createGraReport = createGraReport;
const createSnnitReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date = { date: req.params.month };
        (0, snnitModel_1.SnnitMap)(Database_1.Database);
        const workSheetColumnName = [
            "name",
            "tin",
            "date",
            "basic_salary",
            "tax_relief",
            "net_taxable_pay",
            "total_tax_deduction",
        ];
        const workSheetName = "Snnit Filling";
        const filePath = path_1.default.join(__dirname, '../../report/snnitReport.xlsx');
        const SnnitList = yield snnitModel_1.default.findAll({
            where: {
                date: date.date
            }
        });
        if (SnnitList.length < 1) {
            throw new Error("There is no payroll with for this date");
        }
        const exportPayrollToExcel = (payrollList, workSheetColumnName, workSheetName, filePath) => {
            const data = payrollList.map((snnit) => {
                return [
                    snnit.name,
                    snnit.snnit_no,
                    snnit.date,
                    snnit.basic_salary,
                    snnit.tier_one,
                    snnit.tier_two,
                    snnit.total_snnit_contribution
                ];
            });
            const workBook = XLSX.utils.book_new();
            const workSheetData = [workSheetColumnName, ...data];
            const workSheet = XLSX.utils.json_to_sheet(workSheetData);
            XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
            XLSX.writeFile(workBook, path_1.default.resolve(filePath), { type: "buffer" });
            return workSheet;
        };
        exportPayrollToExcel(SnnitList, workSheetColumnName, workSheetName, filePath);
        res.status(200).sendFile(filePath);
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.createSnnitReport = createSnnitReport;
//# sourceMappingURL=reportCont.js.map