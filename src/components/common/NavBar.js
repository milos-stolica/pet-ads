import React from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutUser as logout } from '../../redux/actions/userActions';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaw } from '@fortawesome/free-solid-svg-icons';
import { host } from '../../utils/constants'

//controller
function NavBar ({user, adTypes, actions}) {
  const activeStyle = { color: '#ffeb4c' };
  const history = useHistory();

  function signout() {
    actions.logoutUser().then(statusCode => statusCode >= 400 && history.push(`/error/${statusCode}`));
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <NavLink to='/' className="navbar-brand" exact>
        <FontAwesomeIcon className="icon-navbar m-auto" icon={faPaw}></FontAwesomeIcon>
      </NavLink>
      <button 
        className="navbar-toggler" 
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarContent" 
        aria-controls="navbarContent" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <NavLink to='/' activeStyle={activeStyle} className="nav-link" exact>HOME <span className="sr-only">(current)</span></NavLink>
          </li>
          <li className="nav-item dropdown">
            <NavLink activeStyle={activeStyle} className="nav-link dropdown-toggle" to="/ads" id="adsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              ADS
            </NavLink>
            <div className="dropdown-menu" aria-labelledby="adsDropdown">
              {adTypes.map(type => <Link className="dropdown-item" to={`/ads?type=${type}`} key={type}>{type}</Link>)}
            </div>
          </li>
          {user.loggedIn &&
            <li className="nav-item dropdown">
            <NavLink activeStyle={activeStyle} className="nav-link dropdown-toggle" to="/new" id="newDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              NEW
            </NavLink>
            <div className="dropdown-menu" aria-labelledby="adsDropdown">
              <Link className="dropdown-item" to="/new/ad">Ad</Link>
              <Link className="dropdown-item" to="/new/subscription">Subscription</Link>
            </div>
          </li>
          } 
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
                <NavLink activeStyle={activeStyle} className="nav-link dropdown-toggle" to="/user" id="userOptionsDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <Image className="user-thumbnail mr-1" src={`${host}/users_images/${user.image_name}`} roundedCircle />
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
      logoutUser: bindActionCreators(logout, dispatch),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (NavBar);