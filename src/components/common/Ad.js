import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

//dumb
function Ad (props) {
  const {id, short_desc, ad_type, pet_type, phone_number, email, price, img_url, state, city} = props;
  const {shouldAddModificationButtons} = props
  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={img_url}/>
      <Card.Body>
        <Card.Title>{`${pet_type} - ${state} (${city})`}</Card.Title>
        {short_desc && <Card.Text> {short_desc} </Card.Text>}
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>Phone: {phone_number}</ListGroupItem>
        <ListGroupItem>Email: {email}</ListGroupItem>
        {ad_type === 'sell' && <ListGroupItem>Price: {price}</ListGroupItem>}
      </ListGroup>
      <Card.Body>
        {shouldAddModificationButtons && <Link className="btn btn-primary mr-3" to={`/new/ad/${id}`}>Update</Link>}
        {!short_desc && <Link className="btn btn-primary" to={`/ad/details/${id}`}>Details</Link>}
      </Card.Body>
    </Card>
  );
}

export default Ad;