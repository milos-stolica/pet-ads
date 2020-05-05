import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';

function SelectItemBar (props) {
  const {barItems, activeItem, handleSelection} = props;
  const {dropdown1, dropdown1Active, handleDropdown1Selection} = props;
  const {dropdown2, dropdown2Active, handleDropdown2Selection} = props;
  const {color} = props;
  //special means it should be in group above divider
  const dropdown1Specials = dropdown1 ? dropdown1.filter(item => item.special) : [];
  const dropdown1NoNSpecials = dropdown1 ? dropdown1.filter(item => !item.special) : [];
  const dropdown2Specials = dropdown2 ? dropdown2.filter(item => item.special) : [];
  const dropdown2NoNSpecials = dropdown2 ? dropdown2.filter(item => !item.special) : [];
  return (
    <nav style={{backgroundColor : color}} className="navbar navbar-expand-lg navbar-dark">
      <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarSupportedContent" 
        aria-controls="navbarSupportedContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className={"navbar-nav " + ((dropdown1 || dropdown2) ? "mr-auto" : "m-auto")}>
          {barItems.map(item => 
            <li key={item.name} className="nav-item">
              <Button 
                variant="link" 
                onClick={handleSelection} 
                className={"bar-item " + (activeItem === item.name ? "selected-item" : "")} 
                name={item.name}>
                {item.name}
                {item.icon && <FontAwesomeIcon className="icon m-auto" icon={icons[item.icon]}></FontAwesomeIcon>}
              </Button>
            </li>)
          }
        </ul>

        <ul className="navbar-nav">
          {dropdown1 &&
            <li className="dropdown show">
              <Button 
                variant="link" 
                className="dropdown-toggle bar-item" 
                id="dropdownMenu1" 
                data-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="false">
                {dropdown1Active}
              </Button>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-scroll" aria-labelledby="dropdownMenu1">
                {dropdown1Specials.map(item => 
                  <Button 
                    variant="link" 
                    className="dropdown-item"
                    onClick={handleDropdown1Selection} 
                    key={item.name}  
                    name={item.name}>
                    {item.name}
                  </Button>) 
                }
                <div className="dropdown-divider"></div>
                {dropdown1NoNSpecials.map(item => 
                  <Button 
                    variant="link" 
                    className="dropdown-item" 
                    onClick={handleDropdown1Selection} 
                    key={item.name} 
                    name={item.name}>
                    {item.name}
                  </Button>) 
                }
              </div>
            </li>
          }

          {dropdown2 &&
            <li className="dropdown show">
              <Button 
                variant="link" 
                className="dropdown-toggle bar-item" 
                id="dropdownMenu2" 
                data-toggle="dropdown" 
                aria-haspopup="true" 
                aria-expanded="false">
                {dropdown2Active}
              </Button>
              <div className="dropdown-menu dropdown-menu-right dropdown-menu-scroll" aria-labelledby="dropdownMenu2">
                {dropdown2Specials.map(item => 
                  <Button 
                    className="dropdown-item"
                    onClick={handleDropdown2Selection} 
                    key={item.name} variant="link" 
                    name={item.name}>
                    {item.name}
                  </Button>) 
                }
                <div className="dropdown-divider"></div>
                {dropdown2NoNSpecials.map(item => 
                  <Button 
                    onClick={handleDropdown2Selection} 
                    key={item.name} 
                    variant="link" 
                    className="dropdown-item" 
                    name={item.name}>
                    {item.name}
                  </Button>) 
                }
              </div>
            </li>
          }
        </ul>
      </div>
    </nav>
  );
}

export default SelectItemBar;