"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitialCategories = void 0;
function getInitialCategories(userId) {
    var initialCategories = [
        {
            userId: userId,
            title: 'Custo dos Serviços Prestados',
            typeId: process.env.EXPENSE_ID,
        },
        {
            userId: userId,
            title: 'Despesas Administrativas',
            typeId: process.env.EXPENSE_ID,
        },
        {
            userId: userId,
            title: 'Despesas contábeis',
            typeId: process.env.EXPENSE_ID,
        },
        {
            userId: userId,
            title: 'Impostos e Contribuições Incidentes sobre Faturamento',
            typeId: process.env.EXPENSE_ID,
        },
        {
            userId: userId,
            title: 'Distribuição de Lucro',
            typeId: process.env.EXPENSE_ID,
        },
        {
            userId: userId,
            title: 'INSS',
            typeId: process.env.EXPENSE_ID,
        },
        {
            userId: userId,
            title: 'Pró-labore',
            typeId: process.env.EXPENSE_ID,
        },
        {
            userId: userId,
            title: 'INSS',
            typeId: process.env.INCOME_ID,
        },
        {
            userId: userId,
            title: 'Pró-labore',
            typeId: process.env.INCOME_ID,
        },
    ];
    return initialCategories;
}
exports.getInitialCategories = getInitialCategories;
//# sourceMappingURL=categories.js.map