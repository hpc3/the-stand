import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";

import { formatDistance } from "date-fns";

import { updateVeggieItem } from "../../actions/veggieActions";

import {
  VeggieCardWrapper,
  VeggieCardHeader,
  VeggieCardContent,
  VeggieCardContentHeading,
} from "../../styled/VeggieCardStyled";

const VeggieCard = ({
  name,
  quantity,
  dateLastStocked,
  price,
  veggieImage,
  inSeason,
  id,
  loggedIn,
  updateVeggieItem,
}) => {
  const [editMode, toggleEditMode] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [veggieItem, setVeggieItem] = useState({
    name,
    quantity,
    price,
    inSeason,
    dateLastStocked,
  });

  const firstUpdate = useRef(true);
  const quantityInput = useRef();
  const priceInput = useRef();

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }

    const updateDateLastStockedOnQunaitityChange = () => {
      const date = new Date();

      const isoString = date.toISOString();
      setVeggieItem({
        ...veggieItem,
        dateLastStocked: isoString,
      });
    };

    updateDateLastStockedOnQunaitityChange();
  }, [veggieItem.quantity]);

  /* 
  
    Where to go from here
      Connect form to handle updating all values
      Create endpoint for updating an item
      If no  error with updating db update the redux state 

  
  */

  const handleSubmit = async () => {
    // fires when you click to push through changes
    // grab the veggieItem state
    // check which values have been changes

    // Loop over the state and check if they match the props

    // check if the quantity has changes, if so update the dateLastStocked
    // null check?

    const propObject = {
      name,
      quantity,
      price,
      inSeason,
    };

    let changesObject = { id };
    // let changesObject = {};

    // null check VV

    // if(veggieItem.name === "" || veggieItem.price === 0 || veggieItem.quantity ) ...etc

    for (const attr in veggieItem) {
      if (veggieItem[attr] !== propObject[attr] && attr !== "dateLastStocked") {
        // if they are not equal i.e. they have been changed

        changesObject[attr] = veggieItem[attr];
      }
    }

    if (changesObject["quantity"]) {
      changesObject["dateLastStocked"] = veggieItem.dateLastStocked;

      // const date = new Date();
      // const isoString = date.toISOString();
      // changesObject["dateLastStocked"] = isoString;
    }

    if (Object.keys(changesObject).length === 0) {
      return;
    }

    const response = await updateVeggieItem(changesObject);

    if (response.status !== 200) {
      setError(response.response.data.message);
      return;
    } else {
      setError(null);
      setSuccess("Item Updated");
      setTimeout(() => {
        document.getElementById("editModeSubmitButton").style.background =
          "-internal-light-dark(rgb(239, 239, 239), rgb(59, 59, 59));";
        toggleEditMode(false);
        setSuccess(null);
      }, 1000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setVeggieItem({
      ...veggieItem,
      [name]: value,
    });
  };

  const handleQunaitityChange = (delta) => {
    const tempQuantity = veggieItem.quantity + delta;

    setVeggieItem({
      ...veggieItem,
      quantity: tempQuantity,
    });
  };

  const defaultCard = (
    <>
      <VeggieCardContentHeading>{name}</VeggieCardContentHeading>
      <p>Quantity: {quantity}</p>
      <p>Price: ${price.toFixed(2)}</p>
      <p>
        Last Updated: {formatDistance(new Date(dateLastStocked), new Date())}{" "}
        ago
      </p>
    </>
  );

  const handleInputFieldChanges = (reference, valueToUpdate) => {
    const typeConvertStringToNumber = Number(reference.current.value);

    setVeggieItem({
      ...veggieItem,
      [valueToUpdate]: typeConvertStringToNumber,
    });

    reference.current.value = null;
  };

  const editableCard = (
    <div>
      {error ? (
        <p style={{ textAlign: "center", color: "red" }}>{error}</p>
      ) : null}
      {success ? (
        <p style={{ textAlign: "center", color: "green" }}>{success}</p>
      ) : null}
      <label>Name:</label>{" "}
      <input
        value={veggieItem.name}
        name="name"
        type="text"
        onChange={handleChange}
      ></input>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "10px 0",
        }}
      >
        <label style={{ flex: 2 }}>Quantity:</label>{" "}
        <p style={{ flex: 1 }}>{veggieItem.quantity}</p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "10px 0",
        }}
      >
        <button onClick={() => handleQunaitityChange(1)}>Incease</button>
        <button onClick={() => handleQunaitityChange(-1)}>Decrease</button>
      </div>
      <div>
        <input type="number" ref={quantityInput}></input>
        <button
          onClick={() => handleInputFieldChanges(quantityInput, "quantity")}
        >
          Enter
        </button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          margin: "10px 0",
        }}
      >
        <label style={{ flex: 2 }}>Price:</label>{" "}
        <p style={{ flex: 1 }}>{veggieItem.price}</p>
      </div>
      <div>
        <input type="number" ref={priceInput}></input>
        <button onClick={() => handleInputFieldChanges(priceInput, "price")}>
          Enter
        </button>
      </div>
      <div style={{ display: "flex" }}>
        <label style={{ flex: 4 }}>
          {veggieItem.inSeason ? "In" : "Out"} of Season:{" "}
        </label>
        <button
          style={{ flex: 1 }}
          onClick={() =>
            setVeggieItem((prevState) => ({
              ...veggieItem,
              inSeason: !prevState.inSeason,
            }))
          }
        >
          Toggle
        </button>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          justifyContent: "space-evenly",
        }}
      >
        <button onClick={handleSubmit} id="editModeSubmitButton">
          Submit
        </button>
        <button onClick={() => toggleEditMode(false)}>Close</button>
      </div>
    </div>

    // inputs for changing stuff
    // collect all data, when you hit submit check what has been chagned, only pass what is different than the props passed in
  );

  return (
    <VeggieCardWrapper editMode={editMode}>
      <VeggieCardHeader editMode={editMode}>
        <img src={veggieImage} alt={"Image of " + name} />
      </VeggieCardHeader>

      <VeggieCardContent>
        {editMode ? editableCard : defaultCard}

        {/* <VeggieCardContentHeading>{name}</VeggieCardContentHeading>
        <p>Quantity: {quantity}</p>
        <p>Price: {price}</p>
        <p>
          Last Updated: {formatDistance(new Date(dateLastStocked), new Date())}{" "}
          ago
        </p> */}
        {loggedIn ? (
          editMode ? null : (
            <button onClick={() => toggleEditMode((editMode) => !editMode)}>
              Edit
            </button>
          )
        ) : null}
        {/* {editMode ? (
          <ProduceControls id={id} quantity={quantity} inSeason={inSeason} />
        ) : null} */}
      </VeggieCardContent>
    </VeggieCardWrapper>
  );
};

export default connect(null, { updateVeggieItem })(VeggieCard);
