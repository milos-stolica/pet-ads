import React from 'react';
import { Button } from 'react-bootstrap';

function Dropdown (props) {
  const {dropdownSpecials, dropdownNonSpetials, dropdownActive, handleDropdownSelection} = props;
  return(
    <li className="dropdown show">
      <Button 
        variant="link" 
        className="dropdown-toggle bar-item" 
        id="dropdownMenu" 
        data-toggle="dropdown" 
        aria-haspopup="true" 
        aria-expanded="false">
        {dropdownActive}
      </Button>
      <div className="dropdown-menu dropdown-menu-right dropdown-menu-scroll" aria-labelledby="dropdownMenu">
        {dropdownSpecials.map(item => 
          <Button 
            variant="link" 
            className="dropdown-item"
            onClick={handleDropdownSelection} 
            key={item.name}  
            name={item.name}>
            {item.name}
          </Button>) 
        }
        <div className="dropdown-divider"></div>
        {dropdownNonSpetials.map(item => 
          <Button 
            variant="link" 
            className="dropdown-item" 
            onClick={handleDropdownSelection} 
            key={item.name} 
            name={item.name}>
            {item.name}
          </Button>) 
        }
      </div>
    </li>
  )
}

export default Dropdown;