import React, {useState} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/userActions';
import { Container, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import SigninForm from '../forms/SigninForm';
import Validator from '../../services/Validator';
import { toast } from 'react-toastify';

const initCredentials = {
  email: '',
  password: ''
}

//controler
function SigninPage ({actions}) {
  const [credentials, setCredentials] = useState(initCredentials);
  const [errors, setErrors] = useState({});
  const [signingIn, setSigningIn] = useState(false);
  const history = useHistory();

  function getFormErrors() {
    return Validator.getLoginFormErrors({
      email: credentials.email, 
      password: credentials.password
    });
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
      setSigningIn(true);
      actions.loginUser(credentials)
      .then(statusCode => {
         setSigningIn(false);
         (statusCode < 400 && history.push('/')) || (statusCode >= 400 && setErrors({wrongCredentials: 'Wrong credentials.'}));
         statusCode < 400 && toast.success('Successfully logged in.');
      })
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
            errors={errors}
            signingIn={signingIn}>
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