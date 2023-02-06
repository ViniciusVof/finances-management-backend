export function getInitialCategories(userId: string) {
  const initialCategories = [
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
