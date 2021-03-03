import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import VeggieCard from "../produce/VeggieCard";
import ManagerAddNewItemWidget from "./ManagerAddNewItemWidget";
import { images } from "../images";

import { SortProduceTools } from "../../components/SortProduceTools";

const ProduceHeader = styled.div`
  text-align: center;
  padding-top: 1.5em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  @media (max-width: 700px) {
    padding: 0;
    flex-direction: column;
  }
`;

const AddNewProduceItemButton = styled.button`
  border: none;
  border-radius: 10px;
  background: green;
  color: white;
  height: 35px;
  padding: 8px;
  margin-left: 5px;

  @media (max-width: 700px) {
    margin-left: 0;
    margin-top: 5px;
  }
`;

const ProduceWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  row-gap: 50px;

  justify-items: center;

  padding: 2em 0;

  max-width: 1000px;

  @media (min-width: 1100px) {
    margin: auto;
  }
`;

const ManagerProduce = ({ veggieItems }) => {
  const [sortType, changeSortType] = useState("name");
  const [sortAscending, toggleSortAscending] = useState(false);

  const [displayAddNewItemModal, toggleDisplayAddNewItemModal] = useState(
    false
  );

  const renderVeggieCards = (veggieData) => {
    const veggieCards = veggieData.map((veggie) => {
      if (images[veggie.id] !== undefined) {
        return (
          <VeggieCard
            key={veggie.id}
            loggedIn={true}
            veggieImage={images[veggie.id].src}
            {...veggie}
          />
        );
      } else {
        return (
          <VeggieCard
            key={veggie.id}
            loggedIn={true}
            veggieImage={images["no-image"].src}
            {...veggie}
          />
        );
      }
    });

    return veggieCards;
  };

  const sortVeggieData = (veggieData) => {
    if (sortAscending) {
      veggieData.sort((a, b) => {
        return a[sortType] > b[sortType] ? 1 : -1;
      });
    } else {
      veggieData.sort((a, b) => {
        return a[sortType] > b[sortType] ? -1 : 1;
      });
    }
    return veggieData;
  };

  const handleChangeSortType = (e) => {
    changeSortType(e.target.value);
  };

  return (
    <>
      {displayAddNewItemModal ? (
        <ManagerAddNewItemWidget closeModal={toggleDisplayAddNewItemModal} />
      ) : null}
      <h1 style={{ textAlign: "center" }}>Inventory</h1>
      <ProduceHeader>
        <SortProduceTools
          selectValue={sortType}
          onChangeFunction={handleChangeSortType}
          toggleSortAscendingFunction={() =>
            toggleSortAscending((sortAscending) => !sortAscending)
          }
          sortAscendingState={sortAscending}
        />
        <AddNewProduceItemButton
          onClick={() => toggleDisplayAddNewItemModal(true)}
        >
          + Add New Item
        </AddNewProduceItemButton>
      </ProduceHeader>

      <ProduceWrapper>
        {renderVeggieCards(sortVeggieData(veggieItems))}
      </ProduceWrapper>
    </>
  );
};

const mapStateToProps = (state) => ({
  veggieItems: state.veggies.veggieItems,
});

export default connect(mapStateToProps, null)(ManagerProduce);
