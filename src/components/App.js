import 'jquery/src/jquery';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import React from 'react';
import { Route, Switch } from "react-router-dom";
import AdsPage from "./AdsPage";
import HomePage from "./HomePage";
import ManageAdPage from "./ManageAdPage";
import PageNotFound from "./PageNotFound";
import NavBar from "./common/NavBar";
import AdDetails from "./AdDetails";

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Switch>
        <Route path='/'       component={HomePage}     exact      />
        <Route path='/ads'    component={AdsPage}                 />
        <Route path='/ad'     component={ManageAdPage} exact      />
        <Route path='/ad/details/:id' component={AdDetails} exact />
        <Route path='/ad/:id' component={ManageAdPage}            />
        <Route                component={PageNotFound}            />
      </Switch>
    </>
  );
}

export default App;
