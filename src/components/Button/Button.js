import React from "react";

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
