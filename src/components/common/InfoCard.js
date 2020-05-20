import React from 'react'
import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';

//dumb
function InfoCard (props) {
  const { id, title, description, information, links, imgUrl, date, icon } = props;

  return (
    <Card className="mb-5 card-info">
      {imgUrl && 
        <div className="image-container">
          <Card.Img variant="top" src={imgUrl}/>
          <div className="image-text">{date}</div>
        </div>
      }
      {!imgUrl && date && <div className="info-card-date">{date}</div>}
      {icon && <FontAwesomeIcon className="icon-small ml-3" icon={icons[icon]}></FontAwesomeIcon>}
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
            {link.transition ? link.transitionName : link.name}
          </Link>
        )}
      </Card.Body>
    </Card>
  );
}

export default InfoCard;