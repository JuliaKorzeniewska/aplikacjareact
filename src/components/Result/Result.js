import React from "react";
import "./Result.css";
function Result({ error, result }) {
  return (
    <div id="result" className="result">
      {error && <div className="error">{error}</div>}
      {result && <div>{result}</div>}
    </div>
  );
}

export default Result;
