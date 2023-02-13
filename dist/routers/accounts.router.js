"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_rescue_1 = __importDefault(require("express-rescue"));
var accounts_controller_1 = __importDefault(require("../controllers/accounts.controller"));
var auth_1 = __importDefault(require("../middlewares/auth"));
var accountsRouter = (0, express_1.Router)();
accountsRouter
    .route('/')
    .post(auth_1.default, (0, express_rescue_1.default)(accounts_controller_1.default.create));
accountsRouter
    .route('/')
    .get(auth_1.default, (0, express_rescue_1.default)(accounts_controller_1.default.findAll));
accountsRouter
    .route('/')
    .put(auth_1.default, (0, express_rescue_1.default)(accounts_controller_1.default.updateAccount));
accountsRouter
    .route('/:id/:accountsId')
    .delete(auth_1.default, (0, express_rescue_1.default)(accounts_controller_1.default.deleteAccounts));
exports.default = accountsRouter;
//# sourceMappingURL=accounts.router.js.map