"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_rescue_1 = __importDefault(require("express-rescue"));
var user_controller_1 = __importDefault(require("../controllers/user.controller"));
var auth_1 = __importDefault(require("../middlewares/auth"));
var userRouter = (0, express_1.Router)();
userRouter.route('/').get(auth_1.default, (0, express_rescue_1.default)(user_controller_1.default.findAll));
userRouter.route('/').post((0, express_rescue_1.default)(user_controller_1.default.create));
userRouter.route('/:id').get(auth_1.default, (0, express_rescue_1.default)(user_controller_1.default.getById));
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map