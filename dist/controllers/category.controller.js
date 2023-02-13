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
var prisma_1 = __importDefault(require("../lib/prisma"));
var CategoryController = /** @class */ (function () {
    function CategoryController() {
    }
    CategoryController.prototype.findAll = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, categories;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = req.body.userId;
                        return [4 /*yield*/, prisma_1.default.categories.findMany({
                                where: {
                                    userId: userId,
                                },
                                include: {
                                    subcategories: true,
                                    type: true,
                                },
                            })];
                    case 1:
                        categories = _a.sent();
                        res.status(http_status_codes_1.StatusCodes.OK).json(categories);
                        return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.prototype.create = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, title, userId, typeEntries, type, category;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, title = _a.title, userId = _a.userId;
                        typeEntries = {
                            income: process.env.INCOME_ID || 'f3466313-b796-42ed-b65b-27edac534468',
                            expense: process.env.EXPENSE_ID || 'c708a3e7-c05b-4645-8c49-6161fd1f88be',
                        };
                        type = req.body.type;
                        return [4 /*yield*/, prisma_1.default.categories.create({
                                data: {
                                    title: title,
                                    userId: userId,
                                    typeId: typeEntries[type],
                                },
                            })];
                    case 1:
                        category = _b.sent();
                        if (!category) {
                            return [2 /*return*/, next({
                                    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
                                    message: 'Não foi possível cadastrar uma nova categoria',
                                })];
                        }
                        res.status(http_status_codes_1.StatusCodes.OK).json({
                            id: category.id,
                            title: category.title,
                            typeId: category.typeId,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    CategoryController.prototype.updateCategory = function (req, res, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, title, userId, typeEntries, type, category;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = req.body, id = _a.id, title = _a.title, userId = _a.userId;
                        typeEntries = {
                            income: process.env.INCOME_ID || 'f3466313-b796-42ed-b65b-27edac534468',
                            expense: process.env.EXPENSE_ID || 'c708a3e7-c05b-4645-8c49-6161fd1f88be',
                        };
                        type = req.body.type;
                        return [4 /*yield*/, prisma_1.default.categories.update({
                                where: {
                                    id: id,
                                },
                                data: {
                                    title: title,
                                    userId: userId,
                                    typeId: typeEntries[type],
                                },
                            })];
                    case 1:
                        category = _b.sent();
                        if (!category) {
                            return [2 /*return*/, next({
                                    status: http_status_codes_1.StatusCodes.BAD_REQUEST,
                                    message: 'Não foi possível editar esta categoria',
                                })];
                        }
                        res.status(http_status_codes_1.StatusCodes.OK).json({
                            id: category.id,
                            title: category.title,
                            typeId: category.typeId,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    return CategoryController;
}());
exports.default = new CategoryController();
//# sourceMappingURL=category.controller.js.map