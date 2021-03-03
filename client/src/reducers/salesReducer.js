const initialState = {
  salesData: [],
  loading: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "GET_SALES_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "GET_SALES_SUCCESS":
      return {
        error: null,
        loading: false,
        salesData: action.payload,
      };
    case "GET_SALES_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "SUBMIT_SALES_DATA":
      let tempDate = new Date(action.payload.date);
      tempDate.setHours(0, 0, 0, 0);
      const dateString = tempDate.toISOString();

      let existCheck = false;

      const temp = state.salesData.map((entry) => {
        if (entry.date === dateString) {
          existCheck = true;
          entry.sales += action.payload.sales;
          entry.expense += action.payload.expense;
          return entry;
        }
        return entry;
      });

      if (!existCheck) {
        temp.push({
          date: action.payload.date,
          sales: action.payload.sales,
          expense: action.payload.expense,
        });
      }

      return {
        ...state,
        salesData: temp,
      };

    default:
      return state;
  }
}
