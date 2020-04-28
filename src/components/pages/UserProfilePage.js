import React, {useState, useEffect} from 'react';
import { Container, Card } from 'react-bootstrap'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import './style/UserProfilePage.css';

function UserProfilePage({user}) {
  //theme from https://bootsnipp.com/tags/profile?page=2
  return (
    <div class="container user-profile">
      <div class="row">
        <div class="col-md-4">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="User profile"/>
        </div>
        <div class="col-md-6">
          <div class="profile-head">
            <h5>{`${user.firstName} ${user.lastName}`}</h5>
            <ul class="nav nav-tabs" role="tablist">
              <li class="nav-item">
                <a class="nav-link active" id="ads-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Manage ads</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" id="subscriptions-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Subscriptions</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="personal-data">
            <h5>Name</h5>
            <p>{user.firstName}</p>
            <h5>Last name</h5>
            <p>{user.lastName}</p>
            <h5>Email</h5>
            <p>{user.email}</p>
          </div>
        </div>
        <div class="col-md-8">
          <div class="tab-content subscriptions-tab">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="ads-tab">
              <h3>Ads are presented here</h3>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="subscriptions-tab">
              <h3>Acive subscriptions goes here</h3>
            </div>
          </div>
        </div>
      </div>         
    </div>
  );
}

function mapStateToProps(state) {
    return {
      user: state.user
    }
  }
  
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      //logoutUser: bindActionCreators(logout, dispatch),
    }
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);