import styled from "styled-components";

export const VeggieCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: fit-content;
  width: 200px;

  box-sizing: border-box;

  border-radius: 5px;
  border: 2px solid black;

  background-color: white;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.12), 0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.12), 0 8px 8px rgba(0, 0, 0, 0.12),
    0 16px 16px rgba(0, 0, 0, 0.12);
`;

export const VeggieCardHeader = styled.div`
  box-sizing: border-box;
  background-color: black;
  height: fit-content;
  width: fit-content;

  & > img {
    height: 200px;
    width: 196px;
    border-radius: 5px 5px 0 0;
  }
`;

export const VeggieCardContent = styled.div`
  font-size: 14px;
  flex: 1;
  box-sizing: border-box;
  padding: 5px;
  border-top-style: none;
`;

export const VeggieCardContentHeading = styled.h3`
  width: fit-content;
  margin: auto;
`;
