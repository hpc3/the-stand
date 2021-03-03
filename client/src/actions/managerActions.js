import axios from "axios";

export const managerLogin = (username, password) => (dispatch) => {
  const requestData = { username, password };

  dispatch({
    type: "MANAGER_LOGIN_LOADING",
  });

  axios({
    method: "post",
    url: "/auth/login",
    data: requestData,
  })
    .then((res) => {
      localStorage.setItem("token", res.data);
      dispatch({
        type: "MANAGER_LOGIN_SUCCESS",
        payload: true,
      });
    })
    .catch((err) =>
      dispatch({
        type: "MANAGER_LOGIN_FAILURE",
        payload: err.response.data.message,
      })
    );
};

export const managerLogout = () => (dispatch) => {
  console.log("action function fired");
  localStorage.removeItem("token");
  dispatch({
    type: "MANAGER_LOGOUT",
    payload: false,
  });
};

export const validToken = () => (dispatch) => {
  dispatch({
    type: "MANAGER_VALID_TOKEN",
    payload: true,
  });
};
