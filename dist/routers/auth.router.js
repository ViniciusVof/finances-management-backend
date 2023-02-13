"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_rescue_1 = __importDefault(require("express-rescue"));
var auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
var authRouter = (0, express_1.Router)();
authRouter.route('/').post((0, express_rescue_1.default)(auth_controller_1.default.authenticate));
exports.default = authRouter;
//# sourceMappingURL=auth.router.js.map