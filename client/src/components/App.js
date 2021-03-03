import React from "react";
import { Route, Switch, withRouter } from "react-router-dom";

import UnAuthRoutes from "../UnAuthRoutes";
import ManagerEntry from "../features/manager/ManagerEntry";

const App = () => {
  return (
    <div>
      <Switch>
        <Route path="/dad" component={ManagerEntry} />
        <Route path="*" component={UnAuthRoutes} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
