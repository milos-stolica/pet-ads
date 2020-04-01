import React, {useState, useEffect} from 'react';
import { Container, Card } from 'react-bootstrap';
import SignupForm from "./SignupForm";

//constroler
function SignupPage (props) {
  const [user, setUser] = useState(initUser);
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState(emptyString);
  const [errors, setErrors] = useState({});

  function handleChange(event) {
    setUser({
      ...user,
      [event.target.name]: event.target.files ? event.target.files[0].name : event.target.value
    });
    if(event.target.files) {
      setFile(event.target.files[0]);
      URL.revokeObjectURL(imgUrl);
      setImgUrl(URL.createObjectURL(event.target.files[0]));
    }
  }

  function handleSubmit(event) {

  }

  return (
    <Container>
      <h1 className="text-center">Registration</h1>
      <Card>
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

const initUser = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    image_name: 'Choose image'
}
const emptyString = '';

export default SignupPage;