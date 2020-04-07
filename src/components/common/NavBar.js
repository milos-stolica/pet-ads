import React, { useEffect } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import * as typesActions from "../../redux/actions/typesActions";
import { bindActionCreators } from "redux";

function NavBar ({adTypes, actions}) {
  const activeStyle = { color: '#007bff' }
  const history = useHistory();

  useEffect(() => {
    if(adTypes.length === 0) {
      actions.loadAdTypes().then(statusCode => statusCode >= 400 && history.push(`/error/${statusCode}`));
    }
  }, []);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
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
              <NavLink activeStyle={activeStyle} className="nav-link" to="/ad">
                NEW
              </NavLink>
            </li>
          </ul>
          {/* <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form> */}
          {/* <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Sign up</button> */}
          <Link className="btn btn-outline-success my-2 my-sm-0" to='/signup'>Sign up</Link>
        </div>
      </nav>
    </>
  );
}

function mapStateToProps(state) {
  return {
    adTypes: state.types.ads
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadAdTypes: bindActionCreators(typesActions.loadAdTypes, dispatch),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (NavBar);