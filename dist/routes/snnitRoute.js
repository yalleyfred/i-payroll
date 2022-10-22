"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const snnitCont_1 = require("../controllers/snnitCont");
const router = (0, express_1.Router)();
router.route("/").get(snnitCont_1.getAllSnnit).post(snnitCont_1.createSnnit);
exports.default = router;
//# sourceMappingURL=snnitRoute.js.map