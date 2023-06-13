export const getCurrencies = () => {
  return fetch("https://api.nbp.pl/api/exchangerates/tables/A/")
    .then((response) => response.json())
    .then((data) => data[0].rates)
    .catch((error) => console.log("Error fetching currencies:", error));
};
