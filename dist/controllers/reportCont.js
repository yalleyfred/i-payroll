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
Object.defineProperty(exports, "__esModule", { value: true });
exports.download = exports.createReport = void 0;
const errorUtils_1 = require("../utils/errorUtils");
const reportService_1 = require("../service/reportService");
const createReport = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const excel = yield (0, reportService_1.downloadExcel)(req.body);
        // console.log(exportPayrollToExcel);
        res.download(excel.filePath);
        // res.send("ok");
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.createReport = createReport;
const download = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('file downloaded');
        const file = "/report/payroll.xlsx";
        console.log(file);
        res.download(file, "payroll.xlsx", function (error, result) {
            if (error) {
                throw error;
            }
            console.log(result);
        });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.download = download;
//# sourceMappingURL=reportCont.js.map