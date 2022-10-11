"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportCont_1 = require("../controllers/reportCont");
const router = (0, express_1.Router)();
router.route('/')
    .post(reportCont_1.createReport);
exports.default = router;
//# sourceMappingURL=reportRoute.js.map