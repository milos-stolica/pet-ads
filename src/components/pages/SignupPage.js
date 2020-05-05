import React, {useState} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../redux/actions/userActions';
import { Container, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import SignupForm from '../forms/SignupForm';
import Validator from '../../services/Validator';
import Errors from '../../services/Errors';

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
  const history = useHistory();

  function trySetFileAndImage(event) {
    if(event.target.files) {
      setFile(event.target.files[0]);
      URL.revokeObjectURL(imgUrl);
      setImgUrl(URL.createObjectURL(event.target.files[0]));
    }
  }

  function getFormErrors() {
    const errors = {};
    if(!Validator.isEmailValid(user.email)) errors.email = 'This is not valid email address.';
    if(!Validator.onlyLetters(user.firstName) || !Validator.lengthInRange(user.firstName, 0 , 50)) errors.firstName = 'This is not valid name.';
    if(!Validator.onlyLetters(user.lastName) || !Validator.lengthInRange(user.lastName, 0 , 50)) errors.lastName = 'This is not valid lastname.';
    if(!Validator.isPasswordValid(user.password)) errors.password = 'Password is not strong enough.'
    if(!Validator.isImage(file)) errors.file = 'Only images of png, jpeg or webp types are allowed.';
    return errors;
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
      actions.registerUser(user, file)
      .then(statusCode => {
        statusCode < 400 && history.push('/signin');
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
            errors={errors}>
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