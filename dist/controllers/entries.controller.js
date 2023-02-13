"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dayjs_1 = __importDefault(require("dayjs"));
var http_status_codes_1 = require("http-status-codes");
var prisma_1 = __importDefault(require("../lib/prisma"));
var EntriesController = /** @class */ (function () {
    function EntriesController() {
    }
    EntriesController.prototype.findAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, typeEntries, type, entries, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.body.userId;
                        typeEntries = {
                            income: process.env.INCOME_ID || '5745c1c0-053e-4d51-941e-66c7c7bc24f3',
                            expense: process.env.EXPENSE_ID || 'e657d9ae-b456-4e7c-a520-08f70a96de6f',
                        };
                        type = req.params.type;
                        return [4 /*yield*/, prisma_1.default.entries.findMany({
                                where: {
                                    userId: userId,
                                    typeId: typeEntries[type],
                                },
                                include: {
                                    type: true,
                                    accounts: true,
                                },
                            })];
                    case 1:
                        entries = _a.sent();
                        result = entries.map(function (entrie) {
                            var _a;
                            return {
                                id: entrie.id,
                                title: entrie.title,
                                bankAccount: (_a = entrie.accounts) === null || _a === void 0 ? void 0 : _a.bankAccount,
                                amount: entrie.amount,
                                type: entrie.type.id,
                                realize: entrie.realize,
                                categoriesId: entrie.categoriesId,
                                accountsId: entrie.accountsId,
                                subCategoriesId: entrie.subCategoriesId,
                                dueDate: (0, dayjs_1.default)(entrie.dueDate).format('DD/MM/YYYY'),
                            };
                        });
                        res.status(http_status_codes_1.StatusCodes.OK).json(result);
                        return [2 /*return*/];
                }
            });
        });
    };
    EntriesController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, userId, accountsId, categoriesId, subCategoriesId, title, amount, realize, dueDate, typeEntries, type, entries;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, userId = _a.userId, accountsId = _a.accountsId, categoriesId = _a.categoriesId, subCategoriesId = _a.subCategoriesId, title = _a.title, amount = _a.amount, realize = _a.realize, dueDate = _a.dueDate;
                        typeEntries = {
                            income: process.env.INCOME_ID || '5745c1c0-053e-4d51-941e-66c7c7bc24f3',
                            expense: process.env.EXPENSE_ID || 'e657d9ae-b456-4e7c-a520-08f70a96de6f',
                        };
                        type = req.body.type;
                        return [4 /*yield*/, prisma_1.default.entries.create({
                                data: {
                                    userId: userId,
                                    accountsId: accountsId,
                                    categoriesId: categoriesId,
                                    subCategoriesId: subCategoriesId,
                                    title: title,
                                    amount: amount,
                                    typeId: typeEntries[type],
                                    realize: realize,
                                    dueDate: (0, dayjs_1.default)(dueDate, 'DD/MM/YYYY').format(),
                                },
                            })];
                    case 1:
                        entries = _b.sent();
                        if (!entries) {
                            return [2 /*return*/, next({
                                    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
                                    message: 'Não foi possível cadastrar esse lançamento',
                                })];
                        }
                        res.status(http_status_codes_1.StatusCodes.OK).json(entries);
                        return [2 /*return*/];
                }
            });
        });
    };
    EntriesController.prototype.realizeEntries = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, realize, dueDate, today, entries;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, id = _a.id, realize = _a.realize, dueDate = _a.dueDate;
                        today = (0, dayjs_1.default)().format('DD/MM/YYYY');
                        return [4 /*yield*/, prisma_1.default.entries.update({
                                where: {
                                    id: id,
                                },
                                data: {
                                    realize: realize,
                                    dueDate: realize
                                        ? (0, dayjs_1.default)(today, 'DD/MM/YYYY').format()
                                        : (0, dayjs_1.default)(dueDate, 'DD/MM/YYYY').format(),
                                },
                            })];
                    case 1:
                        entries = _b.sent();
                        if (!entries) {
                            return [2 /*return*/, next({
                                    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
                                    message: 'Não foi possível alterar o status do lançamento',
                                })];
                        }
                        res.status(http_status_codes_1.StatusCodes.OK).json(entries);
                        return [2 /*return*/];
                }
            });
        });
    };
    EntriesController.prototype.updateEntries = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, accountsId, categoriesId, subCategoriesId, title, amount, realize, dueDate, today, entries;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, id = _a.id, accountsId = _a.accountsId, categoriesId = _a.categoriesId, subCategoriesId = _a.subCategoriesId, title = _a.title, amount = _a.amount, realize = _a.realize, dueDate = _a.dueDate;
                        today = (0, dayjs_1.default)().format('DD/MM/YYYY');
                        return [4 /*yield*/, prisma_1.default.entries.update({
                                where: {
                                    id: id,
                                },
                                data: {
                                    realize: realize,
                                    accountsId: accountsId,
                                    categoriesId: categoriesId,
                                    subCategoriesId: subCategoriesId,
                                    title: title,
                                    amount: amount,
                                    dueDate: (0, dayjs_1.default)(dueDate, 'DD/MM/YYYY').format(),
                                },
                            })];
                    case 1:
                        entries = _b.sent();
                        if (!entries) {
                            return [2 /*return*/, next({
                                    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
                                    message: 'Não foi possível atualizar o lançamento',
                                })];
                        }
                        res.status(http_status_codes_1.StatusCodes.OK).json(entries);
                        return [2 /*return*/];
                }
            });
        });
    };
    EntriesController.prototype.deleteEntries = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var id, deleteEntrie;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = req.params.id;
                        return [4 /*yield*/, prisma_1.default.entries.delete({
                                where: {
                                    id: id,
                                },
                            })];
                    case 1:
                        deleteEntrie = _a.sent();
                        if (!deleteEntrie) {
                            return [2 /*return*/, next({
                                    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
                                    message: 'Não foi possível atualizar o lançamento',
                                })];
                        }
                        res.status(http_status_codes_1.StatusCodes.OK).json({ message: 'Lançamento excluído' });
                        return [2 /*return*/];
                }
            });
        });
    };
    return EntriesController;
}());
exports.default = new EntriesController();
//# sourceMappingURL=entries.controller.js.map