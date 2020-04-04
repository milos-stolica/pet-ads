import React from "react";
import { Form, Button, Col } from "react-bootstrap"
import ImageSelector from './common/ImageSelector'

//dumb
function SignupForm (props) {
  const { firstName, lastName, email, password, image_name } = props.user;
  const errors = props.errors;
  return (
    <Form onSubmit={props.onSubmit}>
      <Form.Group as={Col} controlId="firstName">
        <Form.Label>Name</Form.Label>
        <Form.Control value={firstName} onChange={props.onChange} placeholder="Enter first name" name='firstName'/>
        {errors.firstName && <div className='alert alert-danger'>{errors.firstName}</div>}
      </Form.Group>

      <Form.Group as={Col} controlId="secondName">
        <Form.Label>Last name</Form.Label>
        <Form.Control value={lastName} onChange={props.onChange} placeholder="Enter last name" name='lastName'/>
        {errors.lastName && <div className='alert alert-danger'>{errors.lastName}</div>}
      </Form.Group>

      <Form.Group as={Col} controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control value={email} onChange={props.onChange} type="email" placeholder="Enter email" name='email'/>
        {errors.email && <div className='alert alert-danger'>{errors.email}</div>}
      </Form.Group>

      <Form.Group as={Col} controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={props.onChange} type="password" placeholder="Enter password" name='password'/>
        {errors.password && <div className='alert alert-danger'>{errors.password}</div>}
      </Form.Group>

      <ImageSelector imgName={image_name} onChange={props.onChange} url={props.imageUrl} error={errors.file}/>
     
      <Button variant="primary" type="submit">Sign up</Button>
    </Form>
  );
}

export default SignupForm;