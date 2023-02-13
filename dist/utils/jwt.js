"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var SECRET = process.env.JWT_SECRET || 'secret';
exports.default = {
    sign: function (payload) {
        return jsonwebtoken_1.default.sign(payload, SECRET, { expiresIn: '1h', algorithm: 'HS256' });
    },
    verify: function (token) { return jsonwebtoken_1.default.verify(token, SECRET); },
};
//# sourceMappingURL=jwt.js.map