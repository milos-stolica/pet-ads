import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';

//dumb
function ManageSubscriptionForm (props) {
  const { petType, adType, city, state, _id } = props.subscription;
  const { errors, states, cities, petTypes, adTypes } = props;
  const { actionInProgress } = props;
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="adType">
          <Form.Label>Ad type</Form.Label>
          <Form.Control as="select" value={adType} onChange={props.onChange} name='adType'>
            <option value=''>Choose ad type</option>
            {adTypes && adTypes.map(type => <option key={type}>{type}</option>)}
          </Form.Control>
          {errors.adType && <div className='alert alert-danger'>{errors.adType}</div>}
        </Form.Group>
      </Form.Row>
      <Form.Row>
      <Form.Group as={Col} controlId="petType">
          <Form.Label>Pet type</Form.Label>
          <Form.Control as="select" value={petType} onChange={props.onChange} name='petType'>
            <option value=''>Choose pet</option>
            {petTypes && petTypes.map(type => <option key={type}>{type}</option>)}
          </Form.Control>
          {errors.petType && <div className='alert alert-danger'>{errors.petType}</div>}
        </Form.Group>
      </Form.Row>
      
      <Form.Row>
        <Form.Group className="col-md-6" controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Control value={state} onChange={props.onChange} as="select" name='state'>
            <option>All states</option>
            {states.map(state => <option key={state}>{state}</option>)}
          </Form.Control>
          {errors.state && <div className='alert alert-danger'>{errors.state}</div>}
        </Form.Group>   
        
        <Form.Group className="col-md-6" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control value={city} onChange={props.onChange} as="select" name='city'>
            {cities.map(cityName => <option key={cityName}>{cityName}</option>)}
          </Form.Control>
          {errors.city && <div className='alert alert-danger'>{errors.city}</div>}
        </Form.Group>  
      </Form.Row>
      <Button 
        className="button-success" 
        disabled={actionInProgress} 
        type="submit">
        {_id ? (actionInProgress ? 'Updating...' : 'Update') : (actionInProgress ? 'Saving...' : 'Save')}
      </Button>  
    </Form>
  );
}

export default ManageSubscriptionForm;