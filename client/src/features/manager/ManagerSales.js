import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { Line } from "react-chartjs-2";

import selectMonthIcon from "../../images/selectMonthIcon.png";
import selectWeekIcon from "../../images/selectWeekIcon.png";
import selectYearIcon from "../../images/selectYearIcon.png";

import Dropdown from "../../components/Dropdown";
import ManagerTodayWidget from "./ManagerTodayWidget";

import { buildChartData } from "./managerChartFunctions";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
`;

// Backburdner, on unMount save the chart options to localStorage
// on mount set the localStroage chart options to state to preserve a users setttings [also keeps it consistant when changeing routes(?)]

const ManagerSales = ({ salesData }) => {
  const [timePeriod, setTimePeriod] = useState("week");
  const [chartOptions, setChartOptions] = useState({
    stepped: false,
    chartTypeSum: true,
    fillLine: true,
  });

  const [chartData, setChartData] = useState(
    buildChartData(salesData, timePeriod, chartOptions)
  );

  useEffect(() => {
    setChartData(buildChartData(salesData, timePeriod, chartOptions));
  }, [salesData, timePeriod, chartOptions]);

  const buildChartOptions = () => {
    switch (timePeriod) {
      default:
      case "week":
        return {
          scales: {
            xAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Time in Days",
                },
                type: "time",
                display: true,
                time: {
                  tooltipFormat: "MMM DD, YYYY",
                  unit: "day",
                },
              },
            ],
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Dollars (USD)",
                },
                ticks: {
                  callback: (value, index, values) => {
                    return "$" + value;
                  },
                  stepSize: 100,
                },
              },
            ],
          },
        };
    }
  };

  const handleChartOptionChange = (option) => {
    setChartOptions((prevState) => {
      return {
        ...prevState,
        [option]: !prevState[option],
      };
    });
  };

  const handleTimePeriodChange = (timePeriodChange) => {
    setTimePeriod(timePeriodChange);
  };

  const timePeriodListItems = [
    { title: "Past Week", type: "week", img: selectWeekIcon },
    { title: "Past Month", type: "month", img: selectMonthIcon },
    { title: "Past Year", type: "year", img: selectYearIcon },
  ];

  const optionListItems = [
    {
      title: "Sum / Individual",
      type: "chartTypeSum",
    },
    {
      title: "Stepped",
      type: "stepped",
    },
    {
      title: "Fill Lines",
      type: "fillLine",
    },
  ];

  return (
    <Container>
      <h1 style={{ textAlign: "center", flex: 0.3 }}>Sales</h1>
      <ManagerTodayWidget />

      <div style={{ display: "flex", flexDirection: "row" }}>
        <Dropdown
          listItemsObject={timePeriodListItems}
          optionSelectCallback={handleTimePeriodChange}
          activePeriod={timePeriod}
        >
          Select Time
        </Dropdown>

        <Dropdown
          listItemsObject={optionListItems}
          optionSelectCallback={handleChartOptionChange}
        >
          Chart Options
        </Dropdown>
      </div>

      <div style={{ flex: 3 }}>
        {
          <Line
            data={chartData}
            height={window.innerWidth > 780 ? null : "100%"}
            width={window.innerWidth > 700 ? null : "100%"}
            options={buildChartOptions()}
          />
        }
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  salesData: state.sales.salesData,
});

export default connect(mapStateToProps, {})(ManagerSales);
