import React from "react";

function CurrencyInput({ amount, handleAmountChange }) {
  return (
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
  );
}

export default CurrencyInput;
