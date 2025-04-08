import React from "react";
import "../styles/SortPrice.css";

const SortPrice = ({ sortPrice, onSortChange }) => {
  return (
    <div className="sort-container">
      <select value={sortPrice} onChange={onSortChange}>
        <option value="desc">Low to High</option>
        <option value="asc">High to Low</option>
      </select>
    </div>
  );
};

export default SortPrice;