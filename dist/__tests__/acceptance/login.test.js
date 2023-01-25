'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
process.env.SECRET = "TEST_SECRET";
const { db, users } = require('../../../../../src/auth/models');
const { handleSignin } = require('../../../../../src/auth/router/handlers.js');
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db.sync();
    yield users.create({ username: 'test', password: 'test' });
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield db.drop();
}));
describe('Testing the signin handler', () => {
    const res = {
        send: jest.fn(() => res),
        status: jest.fn(() => res),
        json: jest.fn(() => res),
    };
    const next = jest.fn();
    test('Should find a User when a `user` is present on the request', () => __awaiter(void 0, void 0, void 0, function* () {
        let req = {
            user: yield users.findOne({ where: { username: 'test' } }),
        };
        yield handleSignin(req, res, next);
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
        yield handleSignin(req, res, next);
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
        expect(next).toHaveBeenCalled();
    }));
});
//# sourceMappingURL=login.test.js.map