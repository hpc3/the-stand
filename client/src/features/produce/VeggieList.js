import React, { useEffect, useState } from "react";

import { connect } from "react-redux";

import styled from "styled-components";

import VeggieCard from "./VeggieCard";
import { images } from "../images";

import { SortProduceTools } from "../../components/SortProduceTools";

const VeggieSectionWrapper = styled.section`
  /* margin: 2em 0; */
  margin: 1em;
  flex-direction: column;
  display: flex;
  align-items: center;
  width: 100vw;
  background-color: white;
`;

const VeggieListWrapper = styled.div`
  justify-items: center;

  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  width: 80%;
  display: grid;
  grid-gap: 50px;
  max-width: 1000px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

const VeggieList = ({ veggieItems, loggedIn }) => {
  const [items, setItems] = useState([]);

  const [sortType, changeSortType] = useState("name");
  const [sortAscending, toggleSortAscending] = useState(false);

  useEffect(() => {
    setItems(veggieItems);
  }, [veggieItems]);

  useEffect(() => {
    setItems(sortVeggieData(items));
  }, [sortType, sortAscending]);

  const sortVeggieData = (veggieData) => {
    if (!sortAscending) {
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

  const renderVeggieCards = (veggieData) => {
    const veggieCards = items.map((veggie) => {
      if (veggie.inSeason) {
        if (images[veggie.id] === undefined) {
          // Add Placeholder image
          return (
            <VeggieCard
              key={veggie.id}
              loggedIn={loggedIn}
              {...veggie}
              veggieImage={images["no-image"].src}
            />
          );
        } else {
          return (
            <VeggieCard
              key={veggie.id}
              veggieImage={images[veggie.id].src}
              loggedIn={loggedIn}
              {...veggie}
            />
          );
        }
      } else {
        return null;
      }
    });
    return veggieCards;
  };

  return (
    <VeggieSectionWrapper id="produce">
      <SortProduceTools
        selectValue={sortType}
        onChangeFunction={handleChangeSortType}
        toggleSortAscendingFunction={() =>
          toggleSortAscending((sortAscending) => !sortAscending)
        }
        sortAscendingState={sortAscending}
      />

      <VeggieListWrapper>
        {renderVeggieCards(sortVeggieData(items))}
      </VeggieListWrapper>
    </VeggieSectionWrapper>
  );
};

const mapStateToProps = (state) => ({
  veggieItems: state.veggies.veggieItems,
});

export default connect(mapStateToProps, null)(VeggieList);
