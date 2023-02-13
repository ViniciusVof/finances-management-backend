"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_rescue_1 = __importDefault(require("express-rescue"));
var typeAccounts_controller_1 = __importDefault(require("../controllers/typeAccounts.controller"));
var auth_1 = __importDefault(require("../middlewares/auth"));
var typeAccountsRouter = (0, express_1.Router)();
typeAccountsRouter
    .route('/')
    .post(auth_1.default, (0, express_rescue_1.default)(typeAccounts_controller_1.default.create));
typeAccountsRouter
    .route('/')
    .get(auth_1.default, (0, express_rescue_1.default)(typeAccounts_controller_1.default.findAll));
exports.default = typeAccountsRouter;
//# sourceMappingURL=typeAccounts.router.js.map