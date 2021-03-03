import React from "react";
import styled from "styled-components";

import ToggleAscDecIcon from "../images/toggleAscDecIcon.png";

const VeggieSortToolsWrapper = styled.div`
  display: flex;
  /* margin-bottom: 1em; */
  height: 40px;
  width: 400px;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 500px) {
    flex-direction: column;
    height: 120px;
  }
`;

export const SortProduceTools = ({
  selectValue,
  onChangeFunction,
  toggleSortAscendingFunction,
  sortAscendingState,
}) => {
  return (
    <VeggieSortToolsWrapper>
      <h2 style={{ fontSize: "1.25em" }}>Sort Items:</h2>
      <select
        value={selectValue}
        onChange={onChangeFunction}
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          paddingLeft: "5px",
          border: "2px solid black",
          height: "35px",
          padding: "4px",
        }}
      >
        <option value="dateLastStocked">Date Updated</option>
        <option value="name">Name</option>
        <option value="price">Price</option>
        <option value="quantity">Quantity</option>
      </select>

      <button
        onClick={toggleSortAscendingFunction}
        style={{
          display: "flex",
          alignItems: "center",
          background: "white",
          border: "2px solid black",
          height: "35px",
          padding: "4px",
          borderRadius: "10px",
        }}
      >
        <img
          src={ToggleAscDecIcon}
          style={{
            height: "25px",
            transform: sortAscendingState
              ? "rotate(180deg) scaleX(-1) "
              : "rotate(0deg)",
          }}
        />
        Toggle Ascending
      </button>
    </VeggieSortToolsWrapper>
  );
};

// export default SortProduce;
