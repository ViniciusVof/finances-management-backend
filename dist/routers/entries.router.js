"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var express_rescue_1 = __importDefault(require("express-rescue"));
var entries_controller_1 = __importDefault(require("../controllers/entries.controller"));
var auth_1 = __importDefault(require("../middlewares/auth"));
var entriesRouter = (0, express_1.Router)();
entriesRouter.route('/').post(auth_1.default, (0, express_rescue_1.default)(entries_controller_1.default.create));
entriesRouter.route('/').get(auth_1.default, (0, express_rescue_1.default)(entries_controller_1.default.findAll));
entriesRouter
    .route('/:type')
    .get(auth_1.default, (0, express_rescue_1.default)(entries_controller_1.default.findAll));
entriesRouter
    .route('/realizeEntries')
    .patch(auth_1.default, (0, express_rescue_1.default)(entries_controller_1.default.realizeEntries));
entriesRouter
    .route('/')
    .put(auth_1.default, (0, express_rescue_1.default)(entries_controller_1.default.updateEntries));
entriesRouter
    .route('/:id')
    .delete(auth_1.default, (0, express_rescue_1.default)(entries_controller_1.default.deleteEntries));
exports.default = entriesRouter;
//# sourceMappingURL=entries.router.js.map