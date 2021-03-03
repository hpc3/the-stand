import { combineReducers } from "redux";
import veggieReducer from "./veggieReducer";
import managerReducer from "./managerReducer";
import commentsReducer from "./commetsReducer";
import salesReducer from "./salesReducer";

export default combineReducers({
  veggies: veggieReducer,
  manager: managerReducer,
  comments: commentsReducer,
  sales: salesReducer,
});
