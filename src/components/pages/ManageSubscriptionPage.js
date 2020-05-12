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

const initSubscription = {
  adType: '',
  petType: '',
  city: 'All cities',
  state: 'All states'
};

//controller
function ManageSubscriptionPage({userSubscriptions, allStates, types, actions}) {
  const [subscription, setSubscription] = useState(initSubscription);
  const [errors, setErrors] = useState({});
  const [cities, setCities] = useState([]);
  const [actionInProgress, setActionInProgress] = useState(false);
  const { id } = useParams();
  const history = useHistory();

  function initializeFormFieldValues() {
    if(isNotEmpty(userSubscriptions)) {
      const subscriptionForUpdate = userSubscriptions.find(subscription => subscription._id === id);
      if(subscriptionForUpdate) {
        setSubscription(subscriptionForUpdate);
      } else if(id !== undefined) {
        history.push('/error/404');
      } else {
        setSubscription(initSubscription);
      }
    }
  }

  function getFormErrors() {
    const errors = {};
    if(!Validator.hasNotNumberOrSpecialCh(subscription.city) || !Validator.lengthInRange(subscription.city, 0 , 50)) errors.city = 'This is not valid city name.';
    if(!Validator.hasNotNumberOrSpecialCh(subscription.state) || !Validator.lengthInRange(subscription.state, 0 , 50)) errors.state = 'This is not valid state name.';
    if(!Validator.typeValid(subscription.adType, types.ads)) errors.adType = 'This is not valid ad type.';
    if(!Validator.typeValid(subscription.petType, types.pets)) errors.petType = 'This pet type is not supported yet.';
    return errors;
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
        setCities(cities.map(city => city.name));
      });
    } else {
      setCities([]);
    }
  }

  useEffect(initializeFormFieldValues, [userSubscriptions, id]);
  useEffect(setCitiesList, [allStates, subscription.state]);

  function handleChange(event) {
    setSubscription({...subscription, [event.target.name]: event.target.value});
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(isFormValid()) {
      setActionInProgress(true);
        let func = subscription._id !== undefined ? 'updateSubscription' : 'addSubscription';
        actions[func](subscription).then(statusCode => {
          statusCode < 400 ? history.push(`/user/profile`) : history.push(`/error/${statusCode}`);
        });
    }
  }

  return (
    <Container>
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
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    userSubscriptions: state.userSubscriptions,
    allStates: state.states,
    types: state.types
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