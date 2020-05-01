import React, {useState, useEffect} from 'react';
import { Container, Row, Col } from 'react-bootstrap'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AdList from '../common/AdList';
import './style/UserProfilePage.css';

function UserProfilePage({user, allAds}) {
  //theme from https://bootsnipp.com/tags/profile?page=2
  const [ads, setAds] = useState([]);

  function areAdsLoaded() {
    return allAds.length !== 0;
  }

  function populateUserAds() {
    if(areAdsLoaded()) {
        setAds(allAds.filter(ad => ad.ownerId === user._id))
    }
  }

  useEffect(populateUserAds, [allAds]);

  return (
    <Container className="user-profile">
      <Row>
        <Col md={4} className="profile-img">
          <img src={`http://localhost:3001/users_images/${user.image_name}`} alt="User profile"/>
        </Col>
        <Col md={6}>
          <div className="profile-head">
            <h5>{`${user.firstName} ${user.lastName}`}</h5>
            <ul className="nav nav-tabs" role="tablist">
              <li className="nav-item">
                <a className="nav-link active" id="ads-tab" data-toggle="tab" href="#ads" role="tab" aria-controls="ads" aria-selected="true">Manage ads</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="subscriptions-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Subscriptions</a>
              </li>
            </ul>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={4}>
          <div className="personal-data">
            <h5>Name</h5>
            <p>{user.firstName}</p>
            <h5>Last name</h5>
            <p>{user.lastName}</p>
            <h5>Email</h5>
            <p>{user.email}</p>
          </div>
        </Col>
        <Col md={6}>
          <div className="tab-content">
            <div className="tab-pane fade show active" id="ads" role="tabpanel" aria-labelledby="ads-tab">
              <Row>
                <Col className="text-right">
                  <Link className="btn btn-primary float-right" to="/ad/new">Publish new ad</Link>
                </Col>
              </Row>
              <h5>My ads</h5>
              <AdList ads={ads} lgCol={12} mdCol={12}></AdList>
            </div>
            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="subscriptions-tab">
              <Row>
                <Col className="text-right">
                  <Link className="btn btn-danger float-right" to="/subscription/new">New subscription</Link>
                </Col>
              </Row>
              <h5>Active subscriptions</h5>
              <p>Acive subscriptions goes here...</p>
            </div>
          </div>
        </Col>
      </Row>         
    </Container>
  );
}

function mapStateToProps(state) {
    return {
      user: state.user,
      allAds: state.ads
    }
  }
  
function mapDispatchToProps(dispatch) {
  return {}
}
  
export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);