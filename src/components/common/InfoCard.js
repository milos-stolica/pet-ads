import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

//dumb
function InfoCard (props) {
  const {id, title, description, information, links, imgUrl} = props;
  return (
    <Card className="mb-3">
      {imgUrl && <Card.Img variant="top" src={imgUrl}/>}
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        {description && <Card.Text>{description}</Card.Text>}
      </Card.Body>
      <ListGroup className="list-group-flush">
        {information && information.map(info => info.value && <ListGroupItem key={info.value}>{info.name}: {info.value}</ListGroupItem>)}
      </ListGroup>
      <Card.Body>
        {links && links.map(link => (link.address || link.action) && 
          <Link 
            key={`${link.name}${id}`} 
            onClick={link.action ? link.action(id) : () => {}} 
            className={"btn button-success mr-3 " + (link.class ? link.class : "")} 
            to={link.address ? link.address : '#'}>
            {link.name}
          </Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default InfoCard;