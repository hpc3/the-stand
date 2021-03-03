// In order to toggle chart options i need to pass in the chartOptions object to the functions.

// The switch statment in ManagerSales will call functions in this file depending on it's state

// Steps:
// 1. Prep Data [cut to fit the timeframe]
// 2. Create and return data object

export const buildChartData = (salesData, timePeriod, chartOptions) => {
  /* 
        salesData : array of obj
        timePeriod: string representing the time to graph/chart
        chartOptions: object that alters the way the graph looks/data is graphed
    */

  const dataForTimePeriod = grabDataForTimePeriod(salesData, timePeriod);

  return chartOptions.chartTypeSum
    ? buildSumTotalDataForChart(dataForTimePeriod, chartOptions)
    : buildIndividualDataForChart(dataForTimePeriod, chartOptions);
};

const grabDataForTimePeriod = (salesData, timePeriod) => {
  const mostRecentSalesData = salesData[salesData.length - 1];
  const mostRecentSalesDataDateObject = new Date(mostRecentSalesData.date);

  let data;

  switch (timePeriod) {
    case "month":
      const beginningOfMonth = mostRecentSalesDataDateObject.getDate();
      data = salesData.slice(salesData.length - beginningOfMonth);
      break;
    case "year":
      data = salesData;
      break;
    default:
    case "week":
      const daysSinceSunday = mostRecentSalesDataDateObject.getDay();
      const splitIndex = 1 + daysSinceSunday;
      data = salesData.slice(salesData.length - splitIndex);
      break;
  }

  return data;

  // return a filtered version of salesData
};

const buildSumTotalDataForChart = (dataArray, chartOptions) => {
  let data = {
    labels: [],
    datasets: [
      {
        label: `Sum Total Sales`,
        data: [],
        fill: chartOptions.fillLine,
        backgroundColor: "rgba(35, 247, 2, 1)",
        borderColor: "rgba(0,0,0,0)",
        steppedLine: chartOptions.stepped,
        order: 1,
      },
      {
        label: `Sum Total Expenses`,
        data: [],
        fill: chartOptions.fillLine,
        backgroundColor: "rgb(0, 0, 0)",
        borderColor: "rgba(255, 0, 0, 1)",
        steppedLine: chartOptions.stepped,
        order: 0,
      },
    ],
  };

  let sumOfSales = 0;
  let sumOfExpense = 0;

  let salesObj = {
    x: null,
    y: null,
  };
  let expenseObj = {
    x: null,
    y: null,
  };

  /*
        {
        x: date,
        y: sales/expense
        }
      */

  dataArray.forEach((entry) => {
    const entryDataObject = new Date(entry.date);
    sumOfSales += entry.sales;
    sumOfExpense += entry.expense;

    salesObj = {
      x: entryDataObject,
      y: sumOfSales,
    };

    expenseObj = {
      x: entryDataObject,
      y: sumOfExpense,
    };

    data.datasets[0].data.push(salesObj);
    data.datasets[1].data.push(expenseObj);

    salesObj = {
      x: null,
      y: null,
    };
    expenseObj = {
      x: null,
      y: null,
    };
  });

  return data;
};

const buildIndividualDataForChart = (dataArray, chartOptions) => {
  let data = {
    datasets: [
      {
        label: "Daily Sales",
        data: [],
        fill: chartOptions.fillLine,
        backgroundColor: "rgba(255,0,0,1)",
        borderColor: "rgba(0,0,0,1)",
        steppedLine: chartOptions.stepped,
      },
      {
        label: "Daily Expenses",
        data: [],
        fill: chartOptions.fillLine,
        backgroundColor: "rgb(0, 0, 0)",
        borderColor: "rgba(255,0,0,1)",
        steppedLine: chartOptions.stepped,
      },
    ],
  };

  dataArray.forEach((entry) => {
    let tempSalesObj = { x: new Date(entry.date), y: entry.sales };
    let tempExpenseObj = { x: new Date(entry.date), y: entry.expense };

    data.datasets[0].data.push(tempSalesObj);

    data.datasets[1].data.push(tempExpenseObj);
  });

  return data;
};
