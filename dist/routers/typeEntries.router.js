"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_rescue_1 = __importDefault(require("express-rescue"));
var typeEntries_controller_1 = __importDefault(require("../controllers/typeEntries.controller"));
var auth_1 = __importDefault(require("../middlewares/auth"));
var typesEntriesRouter = (0, express_1.Router)();
typesEntriesRouter
    .route('/')
    .post(auth_1.default, (0, express_rescue_1.default)(typeEntries_controller_1.default.create));
typesEntriesRouter
    .route('/')
    .get(auth_1.default, (0, express_rescue_1.default)(typeEntries_controller_1.default.findAll));
exports.default = typesEntriesRouter;
//# sourceMappingURL=typeEntries.router.js.map