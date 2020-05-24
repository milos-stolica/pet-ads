import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import Dropdown from './Dropdown';

//dumb
function CollapsibleSelectItemBar (props) {
  const { name, barItems, activeItem, handleSelection } = props;
  const { dropdown1, dropdown1Active, handleDropdown1Selection } = props;
  const { dropdown2, dropdown2Active, handleDropdown2Selection } = props;
  const { color } = props;
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
        data-target={`#${name}`}
        aria-controls={name} 
        aria-expanded="false" 
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id={name}>
        <ul className={"navbar-nav " + ((dropdown1 || dropdown2) ? "mr-auto" : "m-auto")}>
          {barItems.map(item => 
            <li key={item.name} className="nav-item">
              <Button 
                variant="link" 
                onClick={handleSelection} 
                className={"bar-item " + (activeItem === item.name ? "selected-item" : "")} 
                name={item.name}>
                <span className="bar-item-name">{item.name}</span>
                {item.icon && <FontAwesomeIcon className="icon m-auto" icon={icons[item.icon]}></FontAwesomeIcon>}
              </Button>
            </li>)
          }
        </ul>

        <ul className="navbar-nav">
          {dropdown1 &&
            <Dropdown
              dropdownSpecials={dropdown1Specials}
              dropdownNonSpetials={dropdown1NoNSpecials}
              dropdownActive={dropdown1Active}
              handleDropdownSelection={handleDropdown1Selection}>
            </Dropdown>
          }
          {dropdown2 &&
            <Dropdown
              dropdownSpecials={dropdown2Specials}
              dropdownNonSpetials={dropdown2NoNSpecials}
              dropdownActive={dropdown2Active}
              handleDropdownSelection={handleDropdown2Selection}>
            </Dropdown>
          }
        </ul>
      </div>
    </nav>
  );
}

export default CollapsibleSelectItemBar;