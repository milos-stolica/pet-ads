import React, {useState} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/userActions';
import { Container, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import SignupForm from '../forms/SignupForm';
import Validator from '../../services/Validator';
import Errors from '../../services/Errors';
import { toast } from 'react-toastify';

const initUser = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  image_name: 'Choose image'
}

//controler
function SignupPage ({actions}) {
  const [user, setUser] = useState(initUser);
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState('');
  const [errors, setErrors] = useState({});
  const [signingUp, setSigningUp] = useState(false);
  const history = useHistory();

  function trySetFileAndImage(event) {
    if(event.target.files) {
      setFile(event.target.files[0]);
      URL.revokeObjectURL(imgUrl);
      setImgUrl(URL.createObjectURL(event.target.files[0]));
    }
  }

  function getFormErrors() {
    return Validator.getRegistrationFormErrors({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      file
    });
  }

  function isFormValid() {
    const errors = getFormErrors();
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleChange(event) {
    setUser({...user, [event.target.name]: event.target.files ? event.target.files[0].name : event.target.value});
    trySetFileAndImage(event);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(isFormValid()) {
      setSigningUp(true);
      actions.registerUser(user, file)
      .then(statusCode => {
        setSigningUp(false);
        statusCode < 400 && history.push('/signin');
        statusCode < 400 && toast.success('You are successfully registered.');
        return statusCode;
      })
      .then(statusCode => {
        statusCode === 409 && setErrors({addressInUse: `${Errors.getErrorExplanation(statusCode).description} ${Errors.getErrorExplanation(statusCode).suggestion}`});
        return statusCode;
      })
      .then(statusCode => statusCode >= 400 && statusCode !== 409 && history.push(`/error/${statusCode}`));
    }
  }

  return (
    <Container>
      <h1 className="text-center">User registration</h1>
      <Card className="card-form">
        <Card.Body>
          <SignupForm 
            user={user}
            onChange={handleChange} 
            onSubmit={handleSubmit} 
            imageUrl={imgUrl}
            errors={errors}
            signingUp={signingUp}>
          </SignupForm>
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
      registerUser: bindActionCreators(userActions.registerUser, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (SignupPage);