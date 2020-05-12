import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import ImageSelector from '../common/ImageSelector';

//dumb
function ManageAdForm (props) {
  const { description, type, ad_type, city, state, phone, email, price, _id } = props.ad;
  const { errors, states, cities, petTypes, adTypes } = props;
  const { actionInProgress } = props;
  const { onAdImageFileChange } = props;
  const { imageName, imageUrl } = props.adImageData;
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Row>
        <Form.Group className="col-md-6">
          <Form.Row>
            <Form.Group as={Col} controlId="adType">
              <Form.Label>Ad type</Form.Label>
              <Form.Control as="select" value={ad_type} onChange={props.onAdTextFieldChange} name='ad_type'>
                <option value=''>Choose ad type</option>
                {adTypes && adTypes.map(type => <option key={type}>{type}</option>)}
              </Form.Control>
              {errors.ad_type && <div className='alert alert-danger'>{errors.ad_type}</div>}
            </Form.Group>
            
            <Form.Group className="col-md-6" controlId="petType">
              <Form.Label>Pet type</Form.Label>
              <Form.Control as="select" value={type} onChange={props.onAdTextFieldChange} name='type'>
                <option value=''>Choose pet</option>
                {petTypes && petTypes.map(type => <option key={type}>{type}</option>)}
              </Form.Control>
              {errors.type && <div className='alert alert-danger'>{errors.type}</div>}
            </Form.Group>
          </Form.Row>

          {ad_type === 'For sale' && <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control value={price} onChange={props.onAdTextFieldChange} name='price'></Form.Control>
            {errors.price && <div className='alert alert-danger'>{errors.price}</div>}
          </Form.Group> 
          }
          
          <Form.Row>
            <Form.Group className="col-md-6" controlId="phoneNumber">
              <Form.Label>Phone</Form.Label>
              <Form.Control value={phone} onChange={props.onAdTextFieldChange} placeholder="Enter phone number" name='phone'/>
              {errors.phone && <div className='alert alert-danger'>{errors.phone}</div>}
            </Form.Group>

            <Form.Group className="col-md-6" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control value={email} type="email" placeholder="Enter email" name='email' disabled/>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group className="col-md-6" controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control value={state} onChange={props.onAdTextFieldChange} as="select" name='state'>
                <option>Choose your state</option>
                {states.map(state => <option key={state}>{state}</option>)}
              </Form.Control>
              {errors.state && <div className='alert alert-danger'>{errors.state}</div>}
            </Form.Group>   
            
            <Form.Group className="col-md-6" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control value={city} onChange={props.onAdTextFieldChange} as="select" name='city'>
                <option>Choose your city</option>
                {cities.map(cityName => <option key={cityName}>{cityName}</option>)}
              </Form.Control>
              {errors.city && <div className='alert alert-danger'>{errors.city}</div>}
            </Form.Group>  
          </Form.Row>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control value={description} onChange={props.onAdTextFieldChange} as="textarea" rows="3" name='description'/>
            {errors.description && <div className='alert alert-danger'>{errors.description}</div>}
          </Form.Group>
        </Form.Group>

        <Form.Group className="col-md-6">
          <Form.Label>Pet image</Form.Label>
          <ImageSelector imgName={imageName} onChange={onAdImageFileChange} url={imageUrl} error={errors.file}/>
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

export default ManageAdForm;