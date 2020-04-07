import React, {useState, useEffect} from 'react';
import { Jumbotron } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Errors from "../../services/Errors";

function ErrorPage() {
  const [error, setError] = useState({});
  const { code } = useParams();

  function setErrorExplanation() {
    setError(Errors.getErrorExplanation(code));
  }

  useEffect(setErrorExplanation, [code]);
  
  return (
    <Jumbotron>
      <h1>{error.description}</h1>
      <p>{error.suggestion}</p>
      <Link className="btn btn-outline-success my-2 my-sm-0" to='/'>Back to home</Link>
    </Jumbotron>
  );
}

export default ErrorPage;