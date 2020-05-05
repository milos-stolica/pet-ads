import React from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import ImageSelector from '../common/ImageSelector';

//dumb
function ManageAdForm (props) {
  const { description, type, ad_type, image_name, city, state, phone, email, price, _id } = props.ad;
  const { errors, states, cities, petTypes, adTypes } = props;
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Row>
        <Form.Group className="col-md-6">
          <Form.Row>
            <Form.Group as={Col} controlId="adType">
              <Form.Label>Ad type</Form.Label>
              <Form.Control as="select" value={ad_type} onChange={props.onChange} name='ad_type'>
                <option value=''>Choose ad type</option>
                {adTypes && adTypes.map(type => <option key={type}>{type}</option>)}
              </Form.Control>
              {errors.ad_type && <div className='alert alert-danger'>{errors.ad_type}</div>}
            </Form.Group>
            
            <Form.Group className="col-md-6" controlId="petType">
              <Form.Label>Pet type</Form.Label>
              <Form.Control as="select" value={type} onChange={props.onChange} name='type'>
                <option value=''>Choose pet</option>
                {petTypes && petTypes.map(type => <option key={type}>{type}</option>)}
              </Form.Control>
              {errors.type && <div className='alert alert-danger'>{errors.type}</div>}
            </Form.Group>
          </Form.Row>

          {ad_type === 'Sell' && <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control value={price} onChange={props.onChange} name='price'></Form.Control>
            {errors.price && <div className='alert alert-danger'>{errors.price}</div>}
          </Form.Group> 
          }
          
          <Form.Row>
            <Form.Group className="col-md-6" controlId="phoneNumber">
              <Form.Label>Phone</Form.Label>
              <Form.Control value={phone} onChange={props.onChange} placeholder="Enter phone number" name='phone'/>
              {errors.phone && <div className='alert alert-danger'>{errors.phone}</div>}
            </Form.Group>

            <Form.Group className="col-md-6" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control value={email} onChange={props.onChange} type="email" placeholder="Enter email" name='email'/>
              {errors.email && <div className='alert alert-danger'>{errors.email}</div>}
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group className="col-md-6" controlId="state">
              <Form.Label>State</Form.Label>
              <Form.Control value={state} onChange={props.onChange} as="select" name='state'>
                <option>Choose your state</option>
                {states.map(state => <option key={state}>{state}</option>)}
              </Form.Control>
              {errors.state && <div className='alert alert-danger'>{errors.state}</div>}
            </Form.Group>   
            
            <Form.Group className="col-md-6" controlId="city">
              <Form.Label>City</Form.Label>
              <Form.Control value={city} onChange={props.onChange} as="select" name='city'>
                <option>Choose your city</option>
                {cities.map(cityName => <option key={cityName}>{cityName}</option>)}
              </Form.Control>
              {errors.city && <div className='alert alert-danger'>{errors.city}</div>}
            </Form.Group>  
          </Form.Row>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control value={description} onChange={props.onChange} as="textarea" rows="3" name='description'/>
            {errors.description && <div className='alert alert-danger'>{errors.description}</div>}
          </Form.Group>
        </Form.Group>

        <Form.Group className="col-md-6">
          <Form.Label>Pet image</Form.Label>
          <ImageSelector imgName={image_name} onChange={props.onChange} url={props.imageUrl} error={errors.file}/>
        </Form.Group>
      </Form.Row>
      
      <Button variant="primary" type="submit">{_id ? 'Update' : 'Save'}</Button>  
    </Form>
  );
}

export default ManageAdForm;