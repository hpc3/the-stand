import axios from "axios";

export const getVeggies = () => (dispatch) => {
  dispatch({
    type: "GET_VEGGIES_REQUEST",
    payload: true,
  });

  axios
    .get("/produce")
    .then((res) => res.data)
    .then((veggies) =>
      dispatch({
        type: "GET_VEGGIES_SUCCESS",
        payload: veggies,
      })
    )
    .catch((err) =>
      dispatch({
        type: "GET_VEGGIES_FAILURE",
        payload: err.message,
      })
    );
};

export const veggieHandleQuantityChange = (delta, itemID) => (dispatch) => {
  dispatch({
    type: "VEGGIE_QUANTITY_CHANGE",
    payload: { delta: delta, itemID: itemID },
  });
};

export const toggleInSeason = (id) => async (dispatch) => {
  // updating the database
  // updating the store

  const token = localStorage.getItem("token");
  try {
    await axios({
      method: "POST",
      url: "/produce/toggleInSeason",
      headers: {
        Authorization: "Bearer " + token,
      },
      data: { id },
    });
    dispatch({
      type: "VEGGIE_TOGGLE_IN_SEASON",
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const addNewVeggieItem = (veggieObject) => async (dispatch) => {
  const token = localStorage.getItem("token");

  veggieObject["price"] = Number(veggieObject["price"]);
  veggieObject["quantity"] = Number(veggieObject["quantity"]);

  try {
    const response = await axios({
      method: "POST",
      url: "/produce",
      headers: {
        Authorization: "Bearer " + token,
      },
      data: veggieObject,
    });
    dispatch({
      type: "VEGGIE_ADD_NEW_ITEM",
      payload: veggieObject,
    });
  } catch (error) {
    return error;
  }
};

export const updateVeggieItem = (veggieUpdateObject) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios({
      method: "POST",
      url: "/produce/update",
      headers: {
        Authorization: "Bearer " + token,
      },
      data: veggieUpdateObject,
    });

    dispatch({
      type: "VEGGIE_UPDATE_ITEM",
      payload: veggieUpdateObject,
    });

    return response;
  } catch (error) {
    return error;
  }
};
