"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loanCont_1 = require("../controllers/loanCont");
const router = (0, express_1.Router)();
router.route('/')
    .get(loanCont_1.getAllLoan)
    .post(loanCont_1.createLoan);
router.route('/:id').get(loanCont_1.getLoan);
exports.default = router;
//# sourceMappingURL=loanRoute.js.map