"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = __importDefault(require("./app"));
var PORT = process.env.PORT || 3000;
app_1.default.listen(PORT, function () { return console.log("\uD83D\uDE80 Server running on port ".concat(PORT)); });
//# sourceMappingURL=server.js.map