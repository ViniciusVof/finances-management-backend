"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_router_1 = __importDefault(require("../routers/auth.router"));
var user_router_1 = __importDefault(require("../routers/user.router"));
var categories_router_1 = __importDefault(require("../routers/categories.router"));
var subcategories_router_1 = __importDefault(require("../routers/subcategories.router"));
var accounts_router_1 = __importDefault(require("../routers/accounts.router"));
var typeAccounts_router_1 = __importDefault(require("../routers/typeAccounts.router"));
var typeEntries_router_1 = __importDefault(require("../routers/typeEntries.router"));
var entries_router_1 = __importDefault(require("../routers/entries.router"));
var dashboard_router_1 = __importDefault(require("../routers/dashboard.router"));
var router = (0, express_1.Router)();
router.use('/users', user_router_1.default);
router.use('/auth', auth_router_1.default);
router.use('/categories', categories_router_1.default);
router.use('/subcategories', subcategories_router_1.default);
router.use('/accounts', accounts_router_1.default);
router.use('/typeAccounts', typeAccounts_router_1.default);
router.use('/typeEntries', typeEntries_router_1.default);
router.use('/entries', entries_router_1.default);
router.use('/dashboard', dashboard_router_1.default);
exports.default = router;
//# sourceMappingURL=routes.js.map