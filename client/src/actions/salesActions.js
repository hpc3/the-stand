import axios from "axios";

export const getSalesData = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  dispatch({
    type: "GET_SALES_REQUEST",
  });

  try {
    const response = await axios({
      method: "GET",
      url: "/sales",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    // sort dates depending

    response.data.sort((a, b) => {
      const aDate = new Date(a.date);
      const bDate = new Date(b.date);

      return aDate - bDate;
    });

    dispatch({
      type: "GET_SALES_SUCCESS",
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: "GET_SALES_FAILURE",
      paylod: error,
    });
  }
};

// Need to grab data
// make sure it looks correct [i.e. date formatting]
// send POST request to /sales
// if everything works update the redux state as well

/* 

  salesData = {
    date: ...,
    sales: ...,
    expense: ...
  }

*/

export const submitSalesDate = (salesData) => async (dispatch) => {
  const token = localStorage.getItem("token");
  // conver sales and expense to number

  // check if sales/expense are null, if so make them 0;

  let { date, sales, expense } = salesData;

  sales = parseInt(sales);
  expense = parseInt(expense);

  if (isNaN(sales)) sales = 0;

  if (isNaN(expense)) expense = 0;

  axios({
    method: "POST",
    url: "/sales",
    headers: {
      Authorization: "Bearer " + token,
    },
    data: { date, sales, expense },
  }).then(() => {
    dispatch({
      type: "SUBMIT_SALES_DATA",
      payload: { date, sales, expense },
    });
  });

  // try {
  //   const response = await axios({
  //     method: "POST",
  //     url: "/sales",
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //     data: { date, sales, expense },
  //   });
  // } catch (error) {}
};

// export const submitSalesData = () => dispatch => {

//   // Pull date,sales,expense data;
//   // build data object

//   const token = localStorage.getItem('token');

//   try {

//     const response = await axios({
//       method: "POST",
//       url: '/sales',
//       headers: {
//         Authorization: "Bearer " + token
//       },
//       data:

//     })

//   } catch (error) {

//   }

// }
