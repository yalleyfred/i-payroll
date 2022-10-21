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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLoan = exports.getLoan = exports.getAllLoan = void 0;
const loanModel_1 = __importStar(require("../model/loanModel"));
const Database_1 = require("../Database");
const errorUtils_1 = require("../utils/errorUtils");
const getAllLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, loanModel_1.LoanMap)(Database_1.Database);
        const loans = yield loanModel_1.default.findAll();
        res.status(200).json({ result: loans });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.getAllLoan = getAllLoan;
const getLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, loanModel_1.LoanMap)(Database_1.Database);
        const id = Number(req.params.id);
        const result = yield loanModel_1.default.findByPk(id);
        res.status(200).json({ user: result });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.getLoan = getLoan;
const createLoan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, loanModel_1.LoanMap)(Database_1.Database);
        const newLoan = req.body;
        yield loanModel_1.default.create(newLoan);
        res.status(200).json({
            status: "success",
            result: newLoan,
        });
    }
    catch (error) {
        return res.status(500).send((0, errorUtils_1.getErrorMessage)(error));
    }
});
exports.createLoan = createLoan;
//# sourceMappingURL=loanCont.js.map