import React from "react";
import ListItem from "./ListItem";

function ListItems({ currencies }) {
  return (
    <>
      {currencies.map((currency) => (
        <ListItem key={currency.code} currency={currency} />
      ))}
    </>
  );
}

export default ListItems;
