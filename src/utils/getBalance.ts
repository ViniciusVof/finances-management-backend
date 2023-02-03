export function getBalanceEntries(data: any[], initialBalance = 0) {
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

export function getBalanceForAccounts(data: any[]) {
  console.log(data);
  const balance = data.reduce(
    (total: number, item: { amountBalance: number }) =>
      (total += Number(item.amountBalance)),
    0
  );

  return balance.toFixed(2);
}
