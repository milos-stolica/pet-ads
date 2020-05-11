import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import AdList from '../common/AdList';
import InfoCard from '../common/InfoCard';
import { deleteAd } from '../../redux/actions/adsActions';
import Spinner from '../common/Spinner';

//controller
function UserProfilePage({user, userAds, actions, userSubscriptions, loading}) {
  //theme from https://bootsnipp.com/tags/profile?page=2
  function deleteAdById(id) {
    return function handleDelete(event) {
      actions.deleteAd(id);
    };
  }

  return (
    <Container className="user-profile">
      {loading ? 
        <Spinner></Spinner> : (
        <>
          <Row>
            <Col md={4} className="profile-img">
              <img src={`http://localhost:3001/users_images/${user.image_name}`} alt="User profile"/>
            </Col>
            <Col md={6}>
              <div className="profile-head">
                <h5>{`${user.firstName} ${user.lastName}`}</h5>
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a className="nav-link active tab-nav" id="ads-tab" data-toggle="tab" href="#ads" role="tab" aria-controls="ads" aria-selected="true">Manage ads</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link tab-nav" id="subscriptions-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Manage subscriptions</a>
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
                      <Link className="btn button-success float-right" to="/new/ad">Publish new ad</Link>
                    </Col>
                  </Row>
                  <h5>My ads</h5>
                  <AdList 
                    ads={userAds} 
                    lgCol={12} 
                    mdCol={12}
                    shouldAddModificationButtons={user.loggedIn}
                    deleteAction={deleteAdById}>
                  </AdList>
                </div>
                <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="subscriptions-tab">
                  <Row>
                    <Col className="text-right">
                      <Link className="btn btn-danger float-right" to="/new/subscription">New subscription</Link>
                    </Col>
                  </Row>
                  <h5>Active subscriptions</h5>
                  <p>You will be notified as soon as required ad is published.</p>
                  {userSubscriptions && userSubscriptions.map(subscription => {
                    return(
                      <InfoCard
                        key={subscription._id}
                        title={`${subscription.petType} - ${subscription.adType}`}
                        information={[{name: 'State', value: subscription.state},
                                      {name: 'City', value: subscription.city}]}
                        links={[{name: 'Update', address: `/new/subscription/${subscription._id}`}]}>
                      </InfoCard>
                    );
                  })}
                </div>
              </div>
            </Col>
          </Row>
        </>
      )}         
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    userAds: state.ads ? state.ads.filter(ad => ad.ownerId === state.user._id) : [],
    userSubscriptions: state.userSubscriptions,
    loading: state.apisInProgress > 0
  }
}
  
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      deleteAd: bindActionCreators(deleteAd, dispatch)
    }
  };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);