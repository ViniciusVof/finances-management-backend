"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_status_codes_1 = require("http-status-codes");
exports.default = (function (err, _req, res, _next) {
    if (err.status)
        return res.status(err.status).json({ message: err.message });
    return res
        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Internal server error', err: err.message });
});
//# sourceMappingURL=error.js.map