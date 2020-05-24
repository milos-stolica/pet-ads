import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';

//dumb
function ItemSelectionBar (props) {
  const { barItems, activeItem, handleSelection } = props;
  const { color } = props;
  
  return (
    <nav style={{backgroundColor : color}} className="navbar navbar-expand navbar-dark">
      <ul className="navbar-nav m-auto">
        {barItems.map(item => 
          <li key={item.name} className="nav-item">
            <Button 
              variant="link" 
              onClick={handleSelection} 
              className={"bar-item bar-item-button " + (activeItem === item.name ? "selected-item" : "")} 
              name={item.name}>
              <span className="button-item-name">{item.name}</span>
              {item.icon && <FontAwesomeIcon className="icon m-auto" icon={icons[item.icon]}></FontAwesomeIcon>}
            </Button>
          </li>)
        }
      </ul>
    </nav>
  );
}

export default ItemSelectionBar;