"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportCont_1 = require("../controllers/reportCont");
const router = (0, express_1.Router)();
router.route("/").post(reportCont_1.createReport);
router.route('/payroll').get(reportCont_1.download);
router.route('/snnit').get(reportCont_1.download);
router.route('/gra').get(reportCont_1.download);
exports.default = router;
//# sourceMappingURL=reportRoute.js.map