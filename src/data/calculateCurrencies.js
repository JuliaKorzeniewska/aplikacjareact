export const calculateResult = (amount, rate) => {
  return (amount * rate).toFixed(2);
};

export const isDataValid = (data) => {
  return !!(data?.rates?.length > 0 && data.rates[0].mid);
};
