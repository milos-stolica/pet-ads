import React, { useEffect } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { Image } from 'react-bootstrap'
import { connect } from "react-redux";
import { loadAdTypes as loadTypes } from "../../redux/actions/typesActions";
import { logoutUser as logout } from '../../redux/actions/userActions';
import { bindActionCreators } from "redux";
import './style/Common.css'

function NavBar ({user, adTypes, actions}) {
  const activeStyle = { color: '#007bff' };
  const history = useHistory();

  function areAdTypesLoaded() {
    return adTypes.length !== 0;
  }

  function loadAdTypes() {
    if(!areAdTypesLoaded()) {
      actions.loadAdTypes().then(statusCode => statusCode >= 400 && history.push(`/error/${statusCode}`));
    }
  }

  function signout() {
    actions.logoutUser().then(statusCode => statusCode >= 400 && history.push(`/error/${statusCode}`));
  }

  useEffect(loadAdTypes, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top mb-3">
        <NavLink to='/' className="navbar-brand" exact>PetAds</NavLink>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink to='/' activeStyle={activeStyle} className="nav-link" exact>HOME <span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink activeStyle={activeStyle} className="nav-link dropdown-toggle" to="/ads" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                ADS
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {adTypes.map(type => <Link className="dropdown-item" to={`/ads?type=${type}`} key={type}>{type}</Link>)}
              </div>
            </li>
            <li>
              <NavLink activeStyle={activeStyle} className="nav-link" to="/ad">NEW</NavLink>
            </li>
          </ul>
          <ul className="navbar-nav mr-0">
            {!user.loggedIn && 
            <>
              <li className="nav-item">
                <NavLink activeStyle={activeStyle} className="nav-link" to="/signin">SIGN IN</NavLink>
              </li>
              <li className="nav-item">
                <NavLink activeStyle={activeStyle} className="nav-link" to="/signup">SIGN UP</NavLink>
              </li>
            </>
            }
            {user.loggedIn && 
              <>
                <li className="nav-item dropdown">
                  <NavLink activeStyle={activeStyle} className="nav-link dropdown-toggle" to="/me" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    <Image className="usertn-navbar mr-1" src={`http://localhost:3001/users_images/${user.image_name}`} roundedCircle />
                    {user.firstName}
                  </NavLink>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to='/user/profile'>My profile</Link>
                    <Link className="dropdown-item" to='/' onClick={signout}>Sign out</Link>
                  </div>
                </li>
              </>
            }
          </ul>
        </div>
      </nav>
    </>
  );
}

function mapStateToProps(state) {
  return {
    adTypes: state.types.ads,
    user: state.user
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadAdTypes: bindActionCreators(loadTypes, dispatch),
      logoutUser: bindActionCreators(logout, dispatch),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (NavBar);