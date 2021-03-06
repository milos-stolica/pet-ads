import 'jquery/src/jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import '../style/App.css';
import React, {useEffect} from 'react';
import { Route, Switch } from 'react-router-dom';
import AdsPage from './pages/AdsPage';
import HomePage from './pages/HomePage';
import ManageAdPage from './pages/ManageAdPage';
import NotFoundPage from './pages/NotFoundPage';
import NavBar from './common/NavBar';
import AdDetailsPage from './pages/AdDetailsPage';
import SignupPage from './pages/SignupPage';
import ErrorPage from './common/ErrorPage';
import SigninPage from './pages/SigninPage';
import UserProfilePage from './pages/UserProfilePage';
import ManageSubscriptionPage from './pages/ManageSubscriptionPage';
import { loadAds } from '../redux/actions/adsActions';
import * as typesActions from '../redux/actions/typesActions';
import { loadStates } from '../redux/actions/statesActions';
import { loadSubscriptions } from '../redux/actions/userSubscriptionsActions';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App({user, actions}) {
  const history = useHistory();
  
  function initializeAdsList() {
    actions.loadAdsFromServer().then(statusCode => statusCode >= 400 && history.push(`/error/${statusCode}`));
  }

  function loadAdTypes() {
    actions.loadAdTypes().then(statusCode => statusCode >= 400 && history.push(`/error/${statusCode}`));
  }

  function loadPetTypes() {
    actions.loadPetTypes().then(statusCode => statusCode >= 400 && history.push(`/error/${statusCode}`));
  }

  function loadStates() {
    actions.loadStates().then(statusCode => statusCode >= 400 && history.push(`/error/${statusCode}`));
  }

  function loadSubscriptions() {
    const user = JSON.parse(localStorage.getItem('user'));
    if(user && user.loggedIn) {
      actions.loadSubscriptions().then(statusCode => statusCode >= 400 && history.push(`/error/${statusCode}`));
    }
  }

  useEffect(initializeAdsList, []);
  useEffect(loadAdTypes, []);
  useEffect(loadPetTypes, []);
  useEffect(loadStates, []);
  useEffect(loadSubscriptions, [user.loggedIn]);

  return (
    <>
      <ToastContainer autoClose={3000} hideProgressBar></ToastContainer>
      <NavBar></NavBar>
      <Switch>
        <Route path='/'                     component={HomePage}               exact/>
        <Route path='/ads'                  component={AdsPage}                     />
        <Route path='/new/ad'               component={ManageAdPage}           exact/>
        <Route path='/ad/details/:id'       component={AdDetailsPage}          exact/>
        <Route path='/new/ad/:id'           component={ManageAdPage}                />
        <Route path='/new/subscription'     component={ManageSubscriptionPage} exact/>
        <Route path='/new/subscription/:id' component={ManageSubscriptionPage}      />
        <Route path='/signup'               component={SignupPage}                  />
        <Route path='/signin'               component= {SigninPage}                 />
        <Route path='/user/profile'         component= {UserProfilePage}            />
        <Route path='/error/:code'          component={ErrorPage}                   />
        <Route                              component={NotFoundPage}                />
      </Switch>
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadAdsFromServer: bindActionCreators(loadAds, dispatch),
      loadAdTypes: bindActionCreators(typesActions.loadAdTypes, dispatch),
      loadPetTypes: bindActionCreators(typesActions.loadPetTypes, dispatch),
      loadStates: bindActionCreators(loadStates, dispatch),
      loadSubscriptions: bindActionCreators(loadSubscriptions, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
