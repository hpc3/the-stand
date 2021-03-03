import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import Manager from "./Manager";
import ManagerLogin from "./ManagerLogin";

const ManagerEntry = ({ loggedIn, match }) => {
  return (
    <>
      <Route path={`${match.path}/login`}>
        {loggedIn ? <Redirect to={match.path} /> : <ManagerLogin />}
      </Route>
      <Route path={"/dad"} component={Manager}>
        {loggedIn ? <Manager /> : <Redirect to={`${match.path}/login`} />}
      </Route>
    </>
  );
};

const mapStateToProps = (state) => ({
  loggedIn: state.manager.loggedIn,
});

export default connect(mapStateToProps, {})(ManagerEntry);
