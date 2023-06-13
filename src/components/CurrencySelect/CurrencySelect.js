import React from "react";
import ListItem from "../List/ListItem";

function CurrencySelect({
  currencies,
  selectedCurrency,
  handleCurrencyChange,
}) {
  return (
    <div className="pick-currency">
      <label htmlFor="currency">Wybierz walutę:</label>
      <select
        id="currency"
        value={selectedCurrency}
        onChange={handleCurrencyChange}
      >
        <option value="">Wybierz walutę</option>
        {currencies.map((currency) => (
          <ListItem key={currency.code} currency={currency} />
        ))}
      </select>
    </div>
  );
}

export default CurrencySelect;
