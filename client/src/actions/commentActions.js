import axios from "axios";

// HEY DID YOU MAKE SURE YOU PASSED THE TOKEN IN

export const getComments = () => async (dispatch) => {
  dispatch({
    type: "GET_COMMENTS_REQUEST",
  });

  const token = localStorage.getItem("token");
  await axios({
    method: "GET",
    url: "/comment",
    headers: {
      Authorization: "Bearer " + token,
    },
  })
    .then((comments) => {
      const { data } = comments;

      data.sort((a, b) => {
        return a.dateSubmitted > b.dateSubmitted
          ? -1
          : a.dateSubmitted > b.dateSubmitted
          ? 1
          : 0;
      });

      dispatch({
        type: "GET_COMMENTS_SUCCESS",
        payload: data,
      });
    })
    .catch((err) =>
      dispatch({
        type: "GET_COMMENTS_FAILURE",
        payload: err.message,
      })
    );
};

export const archiveComment = (id) => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    await axios({
      method: "POST",
      url: "/comment/archive",
      headers: {
        Authorization: "Bearer " + token,
      },
      data: {
        id,
      },
    });

    dispatch({
      type: "COMMENT_ARCHIVE",
      payload: id,
    });
  } catch (error) {
    console.log(error);
  }
};
