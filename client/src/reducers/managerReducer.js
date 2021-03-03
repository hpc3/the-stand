const initialState = {
  loggedIn: false,
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "MANAGER_LOGIN_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "MANAGER_LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        loggedIn: true,
      };
    case "MANAGER_LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "MANAGER_LOGOUT":
      return {
        ...state,
        loggedIn: action.payload,
      };
    case "MANAGER_VALID_TOKEN": {
      return {
        ...state,
        loggedIn: action.payload,
      };
    }
    default:
      return state;
  }
}
