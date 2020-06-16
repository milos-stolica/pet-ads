import React, {useState, useEffect} from 'react';
import { Container, Card } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ManageSubscriptionForm from '../forms/ManageSubscriptionForm';
import * as subscriptionActions from '../../redux/actions/userSubscriptionsActions';
import { useHistory, useParams } from 'react-router-dom';
import CitiesManager from '../../services/CitiesManager';
import Validator from '../../services/Validator';
import { isNotEmpty } from '../../utils/arraysHelper';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';


//controller
function ManageSubscriptionPage({userSubscriptions, allStates, types, loading, actions}) {
  const { id } = useParams();
  const history = useHistory();
  const initializator = getStateValues();

  const [subscription, setSubscription] = useState(initializator.getSubscriptionData());
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [actionInProgress, setActionInProgress] = useState(false);

  function getStateValues() {
    const initSubscriptionData = {
      adType: '',
      petType: '',
      city: 'All cities',
      state: 'All states'
    };

    function getInitialSubscriptionData() {
      if(!isNotEmpty(userSubscriptions)) return initSubscriptionData;
      const subscriptionForUpdate = userSubscriptions.find(subscription => subscription._id === id);
      if(subscriptionForUpdate) {
        return subscriptionForUpdate;
      } else {
        return initSubscriptionData;
      }
    }

    return {
      getSubscriptionData: getInitialSubscriptionData,
      initSubscription: initSubscriptionData
    }
  }

  function initializeFormValuesOnReload() {
    setSubscription(initializator.getSubscriptionData());
  }

  function handleNonExistingSubscriptionId() {
    if(id !== undefined && isNotEmpty(userSubscriptions)) {
      const subscription = userSubscriptions.find(subscription => subscription._id === id);
      !subscription && history.push('/error/404');
    }
  }

  function getFormErrors() {
    return Validator.getManageSubscriptionFormErrors({
      city: subscription.city,
      state: subscription.state,
      adType: subscription.adType,
      petType: subscription.petType
    }, types.ads, types.pets);
  }

  function isFormValid() {
    const errors = getFormErrors();
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function setCitiesList() {
    const state = allStates.find(state => state.name === subscription.state);
    if(state !== undefined) {
      CitiesManager.getCities(state.code, 10000).then(cities => {
        setCities(['All cities', ...cities.map(city => city.name)]);
      });
    } else {
      setCities(['All cities']);
    }
  }

  function handleChange(event) {
    setSubscription({
      ...subscription, 
      [event.target.name]: event.target.value, 
      ...(event.target.name === 'state' && {city: 'All cities'})
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(isFormValid()) {
      setActionInProgress(true);
      let func = subscription._id ? 'updateSubscription' : 'addSubscription';
      actions[func](subscription).then(statusCode => {
        setActionInProgress(false);
        statusCode < 400 ? history.push(`/user/profile?showTab=subscriptions`) : history.push(`/error/${statusCode}`);
        statusCode < 400 && toast.success(`Subscription successfully ${func === 'updateSubscription' ? 'updated' : 'saved.'}.`);
      });
    }
  }

  useEffect(handleNonExistingSubscriptionId, [userSubscriptions, id]);
  useEffect(initializeFormValuesOnReload, [userSubscriptions, id]);
  useEffect(setCitiesList, [allStates, subscription.state]);

  return (
    <Container>
      {loading ? 
        <Spinner></Spinner> : (
        <>
          <h1 className="text-center">{subscription._id ? 'Update subscription' : 'Add new subscription'}</h1>
          <Card className="card-form">
            <Card.Body>
              <ManageSubscriptionForm 
                subscription={subscription} 
                states={allStates.map(state => state.name)} 
                cities={cities}
                petTypes={types.pets}
                adTypes={types.ads} 
                onChange={handleChange} 
                onSubmit={handleSubmit} 
                errors={errors}
                actionInProgress={actionInProgress}>
              </ManageSubscriptionForm>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    userSubscriptions: state.userSubscriptions,
    allStates: state.states,
    types: state.types,
    loading: state.axiosActionsInProgress.loadingUserSubscriptions
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addSubscription: bindActionCreators(subscriptionActions.addSubscription, dispatch),
      updateSubscription: bindActionCreators(subscriptionActions.updateSubscription, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ManageSubscriptionPage);