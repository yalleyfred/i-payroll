"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const reportCont_1 = require("../controllers/reportCont");
const router = (0, express_1.Router)();
router.route('/d/:month')
    .get(reportCont_1.createPayReport);
router.route('/snnit/:month').get(reportCont_1.createSnnitReport);
router.route('/gra/:month').get(reportCont_1.createGraReport);
exports.default = router;
//# sourceMappingURL=reportRoute.js.map