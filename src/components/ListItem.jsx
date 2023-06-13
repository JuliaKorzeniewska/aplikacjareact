import React from "react";

function ListItem({ currency }) {
  return (
    <option value={currency.code}>
      {currency.name} ({currency.code})
    </option>
  );
}

export default ListItem;
