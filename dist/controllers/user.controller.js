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
var http_status_codes_1 = require("http-status-codes");
var bcryptjs_1 = __importDefault(require("bcryptjs"));
var prisma_1 = __importDefault(require("../lib/prisma"));
var categories_1 = require("../data/categories");
var saltRounds = 15;
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.findAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma_1.default.user.findMany()];
                    case 1:
                        user = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json(user);
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, fullname, email, password, user, cryptedPassword, newUser, accounts, categories, transaction;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, fullname = _a.fullname, email = _a.email, password = _a.password;
                        return [4 /*yield*/, prisma_1.default.user.findUnique({
                                where: { email: String(email) },
                            })];
                    case 1:
                        user = _b.sent();
                        if (!!user) return [3 /*break*/, 5];
                        return [4 /*yield*/, bcryptjs_1.default.hash(password, saltRounds)];
                    case 2:
                        cryptedPassword = _b.sent();
                        return [4 /*yield*/, prisma_1.default.user.create({
                                data: {
                                    fullname: fullname,
                                    email: email,
                                    password: cryptedPassword,
                                },
                            })];
                    case 3:
                        newUser = _b.sent();
                        accounts = prisma_1.default.accounts.create({
                            data: {
                                userId: newUser.id,
                                initialBalance: '0',
                                bankAccount: 'Conta inicial',
                                typeAccountsId: process.env.DEFAULT_TYPE_ACCOUNTS_ID ||
                                    '488f33a1-f3f9-4534-b6fc-651aa6643e1d',
                            },
                        });
                        categories = prisma_1.default.categories.createMany({
                            data: (0, categories_1.getInitialCategories)(newUser.id),
                        });
                        if (!newUser) {
                            return [2 /*return*/, next({
                                    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
                                    message: 'Não foi possível cadastrar um novo usuário',
                                })];
                        }
                        return [4 /*yield*/, prisma_1.default.$transaction([accounts, categories])];
                    case 4:
                        transaction = _b.sent();
                        if (!transaction) {
                            return [2 /*return*/, next({
                                    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
                                    message: 'Não foi possível cadastrar novos dados para o usuário',
                                })];
                        }
                        res.status(http_status_codes_1.StatusCodes.OK).json({
                            fullname: fullname,
                            email: email,
                        });
                        _b.label = 5;
                    case 5:
                        if (user) {
                            return [2 /*return*/, next({
                                    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
                                    message: 'Usuário já cadastrado',
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.getById = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prisma_1.default.user.findUnique({
                            where: { id: String(req.params.id) },
                        })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, next({
                                    status: http_status_codes_1.StatusCodes.NOT_FOUND,
                                    message: 'Usuário não encontrado',
                                })];
                        }
                        res.status(http_status_codes_1.StatusCodes.OK).json({
                            id: user.id,
                            fullname: user.fullname,
                            email: user.email,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.default = new UserController();
//# sourceMappingURL=user.controller.js.map