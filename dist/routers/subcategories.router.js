"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_rescue_1 = __importDefault(require("express-rescue"));
var subcategory_controller_1 = __importDefault(require("../controllers/subcategory.controller"));
var auth_1 = __importDefault(require("../middlewares/auth"));
var subcategoriesRouter = (0, express_1.Router)();
subcategoriesRouter
    .route('/')
    .post(auth_1.default, (0, express_rescue_1.default)(subcategory_controller_1.default.create));
subcategoriesRouter
    .route('/')
    .get(auth_1.default, (0, express_rescue_1.default)(subcategory_controller_1.default.findAll));
exports.default = subcategoriesRouter;
//# sourceMappingURL=subcategories.router.js.map