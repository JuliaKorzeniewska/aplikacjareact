import React, { useState, useEffect } from "react";
import ListItems from "./ListItems";
import { getCurrencies } from "../data/apiCurrencies";
import { calculateResult, isDataValid } from "../data/calculateCurrencies";

function CurrencyConverter() {
  const [currencies, setCurrencies] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getCurrencies()
      .then((data) => {
        setCurrencies(data);
      })
      .catch((error) => {
        setError("Error fetching currencies.");
        console.log(error);
      });
  }, []);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    const inputValue = event.target.value;
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(inputValue)) {
      setAmount(inputValue);
    }
  };

  const convertCurrency = () => {
    if (!amount || !selectedCurrency) {
      setError("Wprowadź poprawną kwotę i wybierz walutę.");
      setResult("");
      return;
    }

    const apiUrl = `https://api.nbp.pl/api/exchangerates/rates/A/${selectedCurrency}/?format=json`;

    setResult("");
    setError("");

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (isDataValid(data)) {
          const rate = data.rates[0].mid;
          const calculatedResult = calculateResult(amount, rate);
          setResult(`${amount} ${selectedCurrency} = ${calculatedResult} PLN`);
        } else {
          setError("Wystąpił błąd podczas pobierania aktualnego kursu.");
        }
      })
      .catch((error) => {
        setError("Wystąpił błąd podczas przeliczania waluty.");
      });
  };

  return (
    <div className="container">
      <div className="container-head">
        <h1 className="logo">TransactWorld</h1>
        <h2>Przelicznik walut</h2>
      </div>
      <div className="pick-currency">
        <label htmlFor="currency">Wybierz walutę:</label>
        <select
          id="currency"
          value={selectedCurrency}
          onChange={handleCurrencyChange}
        >
          <ListItems currencies={currencies} />
        </select>
      </div>
      <div className="amount-currency">
        <label htmlFor="amount">Podaj kwotę:</label>
        <input
          type="number"
          id="amount"
          step="0.01"
          min="0"
          value={amount}
          onChange={handleAmountChange}
        />
      </div>
      <div>
        <button onClick={convertCurrency} className="btn">
          Przelicz
        </button>
      </div>
      <div id="result" className="result">
        {error && <div className="error">{error}</div>}
        {result && <div>{result}</div>}
      </div>
    </div>
  );
}

export default CurrencyConverter;
