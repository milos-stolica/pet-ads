import React from "react";
import { Form, Button, Col } from "react-bootstrap";

//dumb
function SigninForm (props) {
  const { email, password } = props.credentials;
  const errors = props.errors;
  return(
    <Form onSubmit={props.onSubmit}>
      {errors.wrongCredentials && <div className='alert alert-danger'>{errors.wrongCredentials}</div>}

      <Form.Group as={Col} controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control value={email} onChange={props.onChange} type="email" placeholder="Enter email" name='email'/>
      </Form.Group>

      <Form.Group as={Col} controlId="password">
        <Form.Label>Password</Form.Label>
        <Form.Control value={password} onChange={props.onChange} type="password" placeholder="Enter password" name='password'/>
      </Form.Group>

      <Form.Group as={Col} controlId="submit">
        <Button variant="primary" type="submit">Login</Button>
      </Form.Group> 
    </Form>
  );
}

export default SigninForm;