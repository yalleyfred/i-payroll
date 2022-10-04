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
exports.createPayroll = exports.getAllPayroll = void 0;
const payrollModel_1 = __importStar(require("../model/payrollModel"));
const errorUtils_1 = require("../utils/errorUtils");
const Database_1 = __importDefault(require("../Database"));
const payService = __importStar(require("./../service/PayService"));
const getAllPayroll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, payrollModel_1.PayrollMap)(Database_1.default);
        let result = yield payrollModel_1.default.findAll();
        res.status(200).json({ payroll: result });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.getAllPayroll = getAllPayroll;
const createPayroll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payroll = yield payService.makePayroll(req.body);
        res.status(200).json({
            status: "success",
            result: payroll.payrollData
        });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.createPayroll = createPayroll;
//# sourceMappingURL=payrollController.js.map