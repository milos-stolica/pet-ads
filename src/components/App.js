import 'jquery/src/jquery';
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.min.js';
import React, {useEffect} from 'react';
import { Route, Switch } from "react-router-dom";
import AdsPage from "./pages/AdsPage";
import HomePage from "./pages/HomePage";
import ManageAdPage from "./pages/ManageAdPage";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./common/NavBar";
import AdDetailsPage from "./pages/AdDetailsPage";
import SignupPage from "./pages/SignupPage";
import ErrorPage from "./common/ErrorPage";
import SigninPage from "./pages/SigninPage";
import UserProfilePage from "./pages/UserProfilePage";
import { loadAds } from "../redux/actions/adsActions";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

function App({actions}) {
  const history = useHistory();
  
  function initializeAdsList() {
    actions.loadAdsFromServer().then(statusCode => statusCode >= 400 && history.push(`/error/${statusCode}`));
  }

  useEffect(initializeAdsList, []);

  return (
    <>
      <NavBar></NavBar>
      <Switch>
        <Route path='/'               component={HomePage}          exact     />
        <Route path='/ads'            component={AdsPage}                     />
        <Route path='/ad'             component={ManageAdPage}      exact     />
        <Route path='/ad/details/:id' component={AdDetailsPage}     exact     />
        <Route path='/ad/:id'         component={ManageAdPage}                />
        <Route path='/signup'         component={SignupPage}                  />
        <Route path='/signin'         component= {SigninPage}                 />
        <Route path='/user/profile'   component= {UserProfilePage}            />
        <Route path='/error/:code'    component={ErrorPage}                   />
        <Route                        component={NotFoundPage}                />
      </Switch>
    </>
  );
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadAdsFromServer: bindActionCreators(loadAds, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
