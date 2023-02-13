"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBalanceForAccounts = exports.getBalanceEntries = void 0;
var dayjs_1 = __importDefault(require("dayjs"));
var today = (0, dayjs_1.default)().format('DD/MM/YYYY');
function getBalanceEntries(data, initialBalance) {
    if (initialBalance === void 0) { initialBalance = 0; }
    var negativeBalance = data
        .filter(function (item) { return item.typeId === process.env.EXPENSE_ID; })
        .reduce(function (total, item) {
        return (total +=
            (0, dayjs_1.default)(item.dueDate).isBefore((0, dayjs_1.default)().add(1, 'day')) && item.realize
                ? Number(item.amount)
                : 0);
    }, 0);
    var positiveBalance = data
        .filter(function (item) { return item.typeId === process.env.INCOME_ID; })
        .reduce(function (total, item) {
        return (total +=
            (0, dayjs_1.default)(item.dueDate).isBefore((0, dayjs_1.default)().add(1, 'day')) && item.realize
                ? Number(item.amount)
                : 0);
    }, 0);
    var balance = initialBalance + positiveBalance - negativeBalance;
    return balance.toFixed(2);
}
exports.getBalanceEntries = getBalanceEntries;
function getBalanceForAccounts(data) {
    var balance = data.reduce(function (total, item) {
        return (total += Number(item.amountBalance));
    }, 0);
    return balance.toFixed(2);
}
exports.getBalanceForAccounts = getBalanceForAccounts;
//# sourceMappingURL=getBalance.js.map