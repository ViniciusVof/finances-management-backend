"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var customParseFormat_1 = __importDefault(require("dayjs/plugin/customParseFormat"));
var dayjs_1 = __importDefault(require("dayjs"));
require("dayjs/locale/pt-br");
var error_1 = __importDefault(require("../middlewares/error"));
var routes_1 = __importDefault(require("./routes"));
var app = (0, express_1.default)();
dayjs_1.default.locale('pt-br');
dayjs_1.default.extend(customParseFormat_1.default);
app.use(express_1.default.json()).use((0, cors_1.default)()).use(routes_1.default).use(error_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map