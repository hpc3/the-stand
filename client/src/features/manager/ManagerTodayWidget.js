import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { submitSalesDate } from "../../actions/salesActions";

import styled from "styled-components";

import { renderDateString } from "./functions";

import salesIcon from "../../images/profit.png";
import expenseIcon from "../../images/expense.png";
import netIcon from "../../images/net.png";

const WidgetWrapper = styled.div`
  flex: 1;

  background-color: #f8f8ff;
  border: 2px solid black;
  border-radius: 10px;

  align-self: center;
  align-items: center;
  width: 90%;
  box-sizing: border-box;
  padding: 1em;

  display: flex;
  flex-direction: column;
  justify-content: space-around;

  max-width: 1000px;

  /* @media(max-width: 700px) */
`;

const TodayWidgetItem = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  align-items: center;

  @media (max-width: 700px) {
    font-size: 10px;
  }
`;

const TodayWidgetIcon = styled.img`
  height: 30px;
  margin-right: 10px;
`;

const ManagerTodayWidget = ({ submitSalesDate, salesData }) => {
  const [formData, setFormData] = useState({
    date: null,
    sales: "",
    expense: "",
  });

  let todaySalesReference = useRef(null);

  const [showsalesDataModal, toggleSalesDataModal] = useState(false);

  useEffect(() => {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    setFormData({ ...formData, date: today.toISOString() });
  }, []);

  const OnFormSubmit = () => {
    submitSalesDate(formData);
    setFormData({ ...formData, sales: "", expense: "" });
    toggleSalesDataModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "date") {
      let formatDate = new Date(value);
      const isoString = formatDate.toISOString();
      setFormData({ ...formData, [name]: isoString });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const profitNegativeOrPositive =
    todaySalesReference.current !== null
      ? todaySalesReference.current.sales -
          todaySalesReference.current.expense >
        0
      : null;

  const checkIfTodayExists = () => {
    const mostRecentSalesData = salesData[salesData.length - 1];

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayISOString = today.toISOString();

    if (mostRecentSalesData.date === todayISOString) {
      todaySalesReference.current = mostRecentSalesData;

      return true;
    } else {
      return false;
    }
  };

  const SalesForm = (
    <ModalWrapper showsalesDataModal={showsalesDataModal}>
      <ModalContainer>
        <h1
          style={{
            textDecorationLine: "underline",
          }}
        >
          Sales Form
        </h1>
        <ModalForm>
          <label>Date:</label>
          {/* Type="date" has some browser compatability issues but should be fine for the use case (i.e. my dads old but not that old [i.e. he uses chrome]) */}
          <input
            type="date"
            name="date"
            max={renderDateString()}
            value={renderDateString(new Date(formData.date))}
            onChange={handleInputChange}
          />
          <label>Sales:</label>
          <input
            name="sales"
            type="number"
            value={formData.sales}
            onChange={handleInputChange}
          />
          <label>Expenses:</label>

          <input
            type="number"
            name="expense"
            value={formData.expense}
            onChange={handleInputChange}
          />
        </ModalForm>

        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            justifyContent: "space-around",
            width: "50%",
          }}
        >
          <FormActionButton
            onClick={() => OnFormSubmit()}
            children="Submit"
            bgColor="green"
          />
          <FormActionButton
            onClick={() => toggleSalesDataModal(false)}
            children="Close"
            bgColor="red"
          />
          {/* <button type="" onClick={() => OnFormSubmit()}>
            Submit
          </button>
          <button onClick={() => toggleSalesDataModal(false)}>Close</button> */}
        </div>
      </ModalContainer>
    </ModalWrapper>
  );

  return (
    <WidgetWrapper>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          width: "90%",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <h1 style={{ marginRight: "5px" }}>Today:</h1>
          <h2>{renderDateString(undefined, "/")}</h2>
        </div>
        <SubmitSalesButton
          onClick={() => toggleSalesDataModal(true)}
          children={"+ Add Data"}
        />
        {SalesForm}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "baseline",
          justifyContent: "space-between",
          width: "90%",
        }}
      >
        {checkIfTodayExists() ? (
          <>
            <TodayWidgetItem>
              <TodayWidgetIcon src={salesIcon} alt="Sales Icon" />
              <h3>Sales: ${todaySalesReference.current.sales}</h3>
            </TodayWidgetItem>
            <TodayWidgetItem>
              <TodayWidgetIcon src={expenseIcon} alt="Expense Icon" />
              <h3>Expense: ${todaySalesReference.current.expense}</h3>
            </TodayWidgetItem>
            <TodayWidgetItem>
              <TodayWidgetIcon src={netIcon} alt="Net  Icon" />
              <h3 style={{ color: profitNegativeOrPositive ? "black" : "red" }}>
                Net: {profitNegativeOrPositive ? null : "-"} ${" "}
                {Math.abs(
                  todaySalesReference.current.sales -
                    todaySalesReference.current.expense
                )}
              </h3>
            </TodayWidgetItem>
          </>
        ) : (
          <h2>No Daily Data Has Been Submitted</h2>
        )}
      </div>
    </WidgetWrapper>
  );
};

const mapStateToProps = (state) => ({
  salesData: state.sales.salesData,
});

export default connect(mapStateToProps, { submitSalesDate })(
  ManagerTodayWidget
);

const SubmitSalesButton = styled.button`
  align-self: center;
  border: none;
  height: 30px;
  width: 90px;

  border-radius: 10px;
  background-color: green;
  color: white;
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: ${(props) => (props.showsalesDataModal ? "block" : "none")};
`;

const ModalContainer = styled.div`
  position: fixed;
  background: white;
  height: 50vh;
  width: 50vw;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  border: 5px solid black;
  border-radius: 15px;
  padding: 1.5em;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 700px) {
    width: 80vw;
    height: 30vh;
  }
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
`;

const FormActionButton = styled.button`
  height: 30px;
  width: 60px;
  border-radius: 5px;
  border: 2px solid ${(props) => props.bgColor};
  color: ${(props) => props.bgColor};
  background-color: white;
  font-weight: 600;

  &:hover {
    background-color: ${(props) => props.bgColor};
    color: white;
  }
`;
