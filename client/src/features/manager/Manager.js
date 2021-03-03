import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getComments } from "../../actions/commentActions";
import { getVeggies } from "../../actions/veggieActions";
import { managerLogout } from "../../actions/managerActions";
import { getSalesData } from "../../actions/salesActions";
import { Switch, useRouteMatch, Route } from "react-router-dom";
import styled from "styled-components";

import ManagerProduce from "./ManagerProduce";
import ManagerComments from "./ManagerComments";
import ManagerNav from "./ManagerNav";
import ManagerSales from "./ManagerSales";

const ManagerWrapper = styled.div`
  display: flex;
  flex-direction: row;
  height: 100vh;
  width: 100vw;
  background-color: #ffffff;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const ManagerContent = styled.div`
  overflow-y: scroll;
  flex: 5;

  /* padding: 5px 0; */

  display: flex;
  flex-direction: column;
`;

const Manager = ({ getComments, getVeggies, getSalesData, loggedIn }) => {
  useEffect(() => {
    async function fetchData() {
      try {
        await getVeggies();
        await getComments();
        await getSalesData();
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [getVeggies, getComments, getSalesData]);

  let match = useRouteMatch();
  return (
    <ManagerWrapper>
      <ManagerNav />
      <ManagerContent>
        <Switch>
          <Route exact path={match.path} component={ManagerProduce} />
          <Route
            exact
            path={`${match.path}/comments`}
            component={ManagerComments}
          />
          <Route exact path={`${match.path}/sales`} component={ManagerSales} />
        </Switch>
      </ManagerContent>
    </ManagerWrapper>
  );
};

const mapStateToProps = (state) => ({
  loading: state.manager.loading,
  loggedIn: state.manager.loggedIn,
});

export default connect(mapStateToProps, {
  getComments,
  managerLogout,
  getVeggies,
  getSalesData,
})(Manager);
