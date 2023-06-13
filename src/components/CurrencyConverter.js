import React, { useState, useEffect } from "react";
import ListItem from "./List/ListItem";
import CurrencyInput from "./CurrencyInput/CurrencyInput";
import CurrencySelect from "./CurrencySelect/CurrencySelect";
import Button from "./Button/Button";
import Result from "./Result/Result";
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
        console.error(error);
      });
  }, []);

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };
  const handleAmountChange = (event) => {
    const inputValue = event.target.value;
    const regex = /^\d*\.?\d{0,2}$/;

    if (regex.test(inputValue) && parseFloat(inputValue) > 0) {
      setAmount(inputValue);
    } else {
      setAmount("");
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
        console.error(error);
      });
  };

  return (
    <div className="container">
      <div className="container-head">
        <h1 className="logo">TransactWorld</h1>
        <h2>Przelicznik walut</h2>
      </div>
      <CurrencySelect
        currencies={currencies}
        selectedCurrency={selectedCurrency}
        handleCurrencyChange={handleCurrencyChange}
      />
      <CurrencyInput amount={amount} handleAmountChange={handleAmountChange} />
      <Button onClick={convertCurrency} />
      <Result error={error} result={result} />
    </div>
  );
}

export default CurrencyConverter;
