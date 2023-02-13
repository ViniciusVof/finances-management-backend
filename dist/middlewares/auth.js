"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_codes_1 = require("http-status-codes");
var jwt_1 = __importDefault(require("../utils/jwt"));
exports.default = (function (req, res, next) {
    var token = req.headers.authorization;
    if (!token)
        return next({
            status: http_status_codes_1.StatusCodes.UNAUTHORIZED,
            message: 'No token provided',
        });
    try {
        var data = jwt_1.default.verify(token);
        res.locals.payload = data;
        req.body.userId = res.locals.payload.id;
        req.body.fullname = res.locals.payload.fullname;
        return next();
    }
    catch (_a) {
        return next({ status: http_status_codes_1.StatusCodes.UNAUTHORIZED, message: 'Unauthorized' });
    }
});
//# sourceMappingURL=auth.js.map