import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { connect } from "react-redux";
import * as typesActions from "../../redux/actions/typesActions";
import { bindActionCreators } from "redux";

function NavBar ({adTypes, actions}) {
  const activeStyle = { color: '#007bff' }

  useEffect(() => {
    if(adTypes.length === 0) {
      actions.loadAdTypes();
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
                {adTypes.map(type => <Link className="dropdown-item" to={`/ads?type=${type}`}>{type}</Link>)}
                {/* <Link className="dropdown-item" to="/ads?type=sell">Sell</Link>
                <Link className="dropdown-item" to="/ads?type=buy" >Buy</Link>
                <Link className="dropdown-item" to="/ads?type=find">Find</Link>
                <Link className="dropdown-item" to="/ads?type=lost">Lost</Link> */}
              </div>
            </li>
            <li>
              <NavLink activeStyle={activeStyle} className="nav-link" to="/ad">
                NEW
              </NavLink>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
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