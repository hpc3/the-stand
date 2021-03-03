const initialState = {
  veggieItems: [],
  loading: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_VEGGIES_REQUEST":
      return {
        ...state,
        loading: true,
      };

    case "GET_VEGGIES_SUCCESS":
      return {
        ...state,
        veggieItems: action.payload,
        loading: false,
      };
    case "GET_VEGGIES_FAILURE":
      return {
        ...state,
        error: action.payload,
      };
    case "VEGGIE_QUANTITY_CHANGE":
      const { itemID, delta } = action.payload;
      let tempVeg = state.veggieItems.map((test) => {
        if (test.id === itemID) {
          test.quantity += delta;
          return test;
        }
        return test;
      });
      return {
        ...state,
        veggieItems: tempVeg,
      };
    case "VEGGIE_TOGGLE_IN_SEASON":
      const newState = { ...state };

      const newVeggie = newState.veggieItems.map((veggie) => {
        if (veggie.id === action.payload) {
          veggie.inSeason = !veggie.inSeason;
          return veggie;
        } else {
          return veggie;
        }
      });
      newState.veggieItems = newVeggie;
      return newState;
    case "VEGGIE_ADD_NEW_ITEM":
      // pull off the veggie state. push object on;

      let tempVeggie = [...state.veggieItems];

      tempVeggie.push(action.payload);

      return {
        ...state,
        veggieItems: tempVeggie,
      };
    case "VEGGIE_UPDATE_ITEM":
      let tempVeggieItems = [...state.veggieItems];
      let indexOfItemToUpdate;

      const itemToUpdate = tempVeggieItems.find((item) => {
        if (item.id === action.payload.id) {
          indexOfItemToUpdate = tempVeggieItems.indexOf(item);
          return item;
        }
      });

      for (let attr in action.payload) {
        if (attr === "id") {
          continue;
        }
        itemToUpdate[attr] = action.payload[attr];
      }

      tempVeggieItems[indexOfItemToUpdate] = itemToUpdate;

      return {
        ...state,
        veggieItems: tempVeggieItems,
      };
    default:
      return state;
  }
}
