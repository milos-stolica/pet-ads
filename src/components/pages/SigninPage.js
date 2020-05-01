import React, {useState} from 'react';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as userActions from "../../redux/actions/userActions"
import { Container, Card } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import SigninForm from "../forms/SigninForm";
import Validator from '../../services/Validator';
import "./style/Common.css";

const initCredentials = {
  email: '',
  password: ''
}

//controler
function SigninPage ({actions}) {
  const [credentials, setCredentials] = useState(initCredentials);
  const [errors, setErrors] = useState({});
  const history = useHistory();

  function getFormErrors() {
    const errors = {};
    if(!Validator.isEmailValid(credentials.email) || !Validator.isPasswordValid(credentials.password)) errors.wrongCredentials = 'Wrong credentials.';
    return errors;
  }

  function isFormValid() {
    const errors = getFormErrors();
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleChange(event) {
    setCredentials({...credentials, [event.target.name]: event.target.value});
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(isFormValid()) {
      actions.loginUser(credentials)
      .then(statusCode => (statusCode < 400 && history.push('/')) || (statusCode >= 400 && setErrors({wrongCredentials: 'Wrong credentials.'})));
    }
  }

  return (
    <Container>
      <h1 className="text-center">Sign in</h1>
      <Card className="card-form">
        <Card.Body>
          <SigninForm 
            credentials={credentials}  
            onChange={handleChange} 
            onSubmit={handleSubmit} 
            errors={errors}>
          </SigninForm>
        </Card.Body>
      </Card>
    </Container>
  );
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loginUser: bindActionCreators(userActions.loginUser, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SigninPage);