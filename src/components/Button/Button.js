import React from "react";
import "./Button.css";
function Button({ onClick }) {
  return (
    <div>
      <button onClick={onClick} className="btn">
        Przelicz
      </button>
    </div>
  );
}

export default Button;
