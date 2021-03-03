import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { addNewVeggieItem } from "../../actions/veggieActions";
import { connect } from "react-redux";

// gets hooked up to redux
// adds a new item to produce store
// updates the database
// ManagerProduce should auto reload when submitted to dispaly the new item.

// 1. Get the widget to appear over Manager Sales when it is clicked
// i.e. how it works in managerSales

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: block;
`;

const ModalContainer = styled.div`
  position: fixed;
  background: white;
  height: 50vh;
  width: 50vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border: 5px solid black;
  border-radius: 15px;
  padding: 1.5em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 700px) {
    width: 80vw;
    height: 30vh;
  }
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`;

// dont need a display props since managerProudce will be contorlling if it is rendered or not
const ManagerAddNewItemWidget = ({ closeModal, addNewVeggieItem }) => {
  const [veggieItem, setVeggieItem] = useState({
    id: "",
    name: "",
    quantity: "",
    price: "",
    inSeason: false,
    dateLastStocked: null,
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const node = useRef();

  useEffect(() => {
    createID(veggieItem.name);
  }, [veggieItem.name]);

  useEffect(() => {
    createDateLastModified();
    document.addEventListener("mousedown", checkClick);
    return document.removeEventListener("mousedown", checkClick);
  }, []);

  const checkClick = (e) => {
    return node.current === e.target ? handleClosingModal() : null;
  };

  const handleClosingModal = () => {
    closeModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setVeggieItem({
      ...veggieItem,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    setError("");
    if (
      veggieItem.price !== "" &&
      veggieItem.quantity !== "" &&
      veggieItem.name !== ""
    ) {
      const errorCheck = await addNewVeggieItem(veggieItem);

      if (!errorCheck) {
        setError(null);

        setTimeout(() => {
          setSuccessMessage("Product Added!");
        }, 200);
        setTimeout(() => {
          closeModal(false);
        }, 1250);
      } else {
        setError(errorCheck.response.data.message);
      }

      //   need to pass in time
      // 2020-11-18T15:45:26.164Z
    } else {
      setError("Make sure you fill out all of the values");
      setTimeout(() => {
        setError("");
      }, 1000);
    }
  };

  const createDateLastModified = () => {
    const date = new Date();
    const isoString = date.toISOString();

    setVeggieItem({ ...veggieItem, dateLastStocked: isoString });
  };

  const createID = (name) => {
    const tempID = name.replace(" ", "-").toLowerCase();

    setVeggieItem({ ...veggieItem, id: tempID });
  };

  return (
    <ModalWrapper ref={node}>
      <ModalContainer>
        <h1
          style={{
            textDecorationLine: "underline",
          }}
        >
          Add New Item
        </h1>
        <h2 style={{ color: "red", fontSize: "16px" }}>{error ? error : ""}</h2>
        <h2 style={{ color: "green", fontSize: "16px" }}>
          {successMessage ? successMessage : ""}
        </h2>

        <ModalForm>
          <label>Name:</label>
          <input
            value={veggieItem.name}
            onChange={handleInputChange}
            name="name"
          />
          {/* Type="date" has some browser compatability issues but should be fine for the use case (i.e. my dads old but not that old [i.e. he uses chrome]) */}

          <label>Price:</label>
          <input
            value={veggieItem.price}
            type="number"
            onChange={handleInputChange}
            name="price"
          />

          <label>Quantity:</label>
          <input
            value={veggieItem.quantity}
            type="number"
            onChange={handleInputChange}
            name="quantity"
          />

          <label>In Season : {veggieItem.inSeason.toString()} </label>
          <button
            onClick={(e) => {
              e.preventDefault();
              setVeggieItem((prevState) => ({
                ...prevState,
                inSeason: !prevState.inSeason,
              }));
            }}
          >
            Toggle
          </button>
        </ModalForm>
        <div
          style={{
            display: "flex",
            width: "200px",
            justifyContent: "space-around",
          }}
        >
          <button onClick={handleClosingModal}>Close</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </ModalContainer>
    </ModalWrapper>
  );
};

export default connect(null, { addNewVeggieItem })(ManagerAddNewItemWidget);
