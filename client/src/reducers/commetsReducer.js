const initialState = {
  comments: [],
  loading: null,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_COMMENTS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_COMMENTS_SUCCESS":
      return {
        ...state,
        loading: false,
        comments: action.payload,
      };
    case "GET_COMMENTS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "COMMENT_ARCHIVE": {
      const { comments } = state;
      const filteredComments = comments.filter(
        (comment) => comment._id !== action.payload
      );
      return {
        ...state,
        comments: filteredComments,
      };
    }
    default:
      return state;
  }
}
