import React from "react";
import styled from "styled-components";
import VeggieList from "../features/produce/VeggieList";

const VeggieWrapper = styled.div`
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
`;

const VeggieHeading = styled.h1`
  font-size: 4em;
  color: black;
  border-bottom: 5px solid black;
`;

export const Veggies = () => {
  return (
    <VeggieWrapper id="produce">
      <VeggieHeading> Produce </VeggieHeading>
      <VeggieList />
    </VeggieWrapper>
  );
};
