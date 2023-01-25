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
const supertest_1 = __importDefault(require("supertest"));
const app_1 = require("../../app");
const userModel_1 = __importStar(require("../../model/userModel"));
const Database_1 = require("../../Database");
describe('get all users', () => {
    describe('given all users exist', () => {
        it('should return a 200', () => __awaiter(void 0, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.app).get('/api/v1/users').expect(200);
            //   console.log(response.body);
        }));
    });
    describe('should creating a new user fails', () => {
        it('return a 500', () => {
            (0, supertest_1.default)(app_1.app).post('/api/v1/users').expect(500);
        });
    });
});
describe('Testing the signin handler', () => {
    const res = {
        send: jest.fn(() => res),
        status: jest.fn(() => res),
        json: jest.fn(() => res),
    };
    const next = jest.fn();
    test('Should find a User when a `user` is present on the request', () => __awaiter(void 0, void 0, void 0, function* () {
        (0, userModel_1.UserMap)(Database_1.Database);
        let req = {
            user: yield userModel_1.default.findOne({ where: { username: 'test' } }),
        };
        //   await handleSignin(req, res, next);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            user: expect.objectContaining({
                username: expect.any(String),
                password: expect.any(String),
                token: expect.any(String),
            }),
            token: expect.any(String),
        }));
    }));
    test('Should trigger error handler when no user is present on the request', () => __awaiter(void 0, void 0, void 0, function* () {
        let req = {};
        jest.clearAllMocks();
        //   await handleSignin(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=user.test.js.map