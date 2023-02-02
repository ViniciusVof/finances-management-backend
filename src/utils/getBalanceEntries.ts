interface IEntries {
  id: string;
  title: string;
  bankAccount: string;
  amount: number;
  typeId: string;
  realize: boolean;
  dueDate: Date;
}

export function getBalanceEntries(data: IEntries[], initialBalance = 0) {
  const negativeBalance = data
    .filter(
      (item: { typeId: string }) => item.typeId === process.env.EXPENSE_ID
    )
    .reduce(
      (total: number, item: { realize: boolean; amount: number }) =>
        (total += item.realize ? Number(item.amount) : 0),
      0
    );
  const positiveBalance = data
    .filter((item: { typeId: string }) => item.typeId === process.env.INCOME_ID)
    .reduce(
      (total: number, item: { realize: boolean; amount: number }) =>
        (total += item.realize ? Number(item.amount) : 0),
      0
    );
  const balance = initialBalance + positiveBalance - negativeBalance;
  return balance.toFixed(2);
}
