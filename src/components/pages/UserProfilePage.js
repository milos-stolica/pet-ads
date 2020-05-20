import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import qs from 'query-string';
import { Link } from 'react-router-dom';
import AdList from '../common/AdList';
import InfoCard from '../common/InfoCard';
import { deleteAd } from '../../redux/actions/adsActions';
import { deleteSubscription } from '../../redux/actions/userSubscriptionsActions';
import Spinner from '../common/Spinner';
import { getFormatedDateTimeFromISOTime } from '../../utils/dateTimeFormater';
import { addIconsToPetTypes } from "../../utils/iconsHelper";
import { toast } from 'react-toastify';

//controller
function UserProfilePage(props) {
  //theme from https://bootsnipp.com/tags/profile?page=2
  const { user, userAds, petTypes, actions, userSubscriptions, location } = props;
  const { loadingAds, loadingUserSubscriptions } = props;
  const showTab = qs.parse(location.search).showTab;
  const petTypes2Icons = addIconsToPetTypes(petTypes);

  const [deleteAdInProgress, setDeleteAdInProgress] = useState([]);
  const [deleteSubscriptionInProgress, setDeleteSubscriptionInProgress] = useState([]);
  const [activeTab, setActiveTab] = useState(showTab);

  function getSubscriptionTitle(petType, adType) {
    return `${petType} - ${adType}`;
  }

  function getSubscriptionInformation(state, city) {
    return [{ name: 'State', value: state },
            { name: 'City', value: city }];
  }

  function getLinkButtons(subscriptionId) {
    return [{ name: 'Update', 
              address: `/new/subscription/${subscriptionId}`},
            { name: 'Delete', 
              transitionName: 'Deleting...', 
              transition: deleteSubscriptionInProgress.includes(subscriptionId), 
              action: deleteSubscriptionById, 
              class: 'btn-danger'}];
  }

  function deleteAdById(id) {
    return function handleDelete(event) {
      setDeleteAdInProgress([...deleteAdInProgress, id]);
      actions.deleteAd(id).then(() => {
        setDeleteAdInProgress(deleteAdInProgress.filter(adId => adId !== id));
        setActiveTab('ads');
        toast.success('Ad successfully deleted.');
      });
    };
  }

  function deleteSubscriptionById(id) {
    return function handleDelete(event) {
      setDeleteSubscriptionInProgress([...deleteSubscriptionInProgress, id]);
      actions.deleteSubscription(id).then(() => {
        setDeleteSubscriptionInProgress(deleteSubscriptionInProgress.filter(subscriptionId => subscriptionId !== id));
        setActiveTab('subscriptions');
        toast.success('Subscription successfully deleted.');
      });
    };
  }

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
                <a 
                  className={"nav-link tab-nav " + (!activeTab || activeTab === 'ads' ? 'active' : '')} 
                  id="ads-tab" 
                  data-toggle="tab" 
                  href="#ads" 
                  role="tab" 
                  aria-controls="ads" 
                  aria-selected={!activeTab || activeTab === 'ads'}>
                  Manage ads
                </a>
              </li>
              <li className="nav-item">
                <a 
                  className={"nav-link tab-nav " + (activeTab === 'subscriptions' ? 'active' : '')} 
                  id="subscriptions-tab" 
                  data-toggle="tab" 
                  href="#profile" 
                  role="tab" 
                  aria-controls="profile" 
                  aria-selected={activeTab === 'subscriptions'}>
                  Manage subscriptions
                </a>
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
            {(loadingAds || loadingUserSubscriptions) ? 
              <Spinner></Spinner> : (
              <>
                <div 
                  className={"tab-pane fade " + (!activeTab || activeTab === 'ads' ? 'show active' : '')} 
                  id="ads" 
                  role="tabpanel" 
                  aria-labelledby="ads-tab">
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
                    deleteAction={deleteAdById}
                    deleteInProgress={deleteAdInProgress}
                    petTypes={petTypes}
                    showPrice={true}
                    showImage={true}>
                  </AdList>
                </div>
              
                <div 
                  className={"tab-pane fade " + (activeTab === 'subscriptions' ? 'show active' : '')} 
                  id="profile" 
                  role="tabpanel" 
                  aria-labelledby="subscriptions-tab">
                  <Row>
                    <Col className="text-right">
                      <Link className="btn btn-danger float-right" to="/new/subscription">Free subscription</Link>
                    </Col>
                  </Row>
                  <h5>Active subscriptions</h5>
                  <p>You will be notified as soon as required ad is published.</p>
                  {userSubscriptions && userSubscriptions.map(subscription => {
                    return(
                      <InfoCard
                        id={subscription._id}
                        key={subscription._id}
                        date={getFormatedDateTimeFromISOTime(subscription.updatedAt)}
                        icon={petTypes2Icons.filter(item => item.name === subscription.petType).map(item => item.icon)[0]}
                        title={getSubscriptionTitle(subscription.petType, subscription.adType)}
                        information={getSubscriptionInformation(subscription.state, subscription.city)}
                        links={getLinkButtons(subscription._id)}>
                      </InfoCard>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </Col>
      </Row>        
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user,
    userAds: state.ads ? state.ads.filter(ad => ad.ownerId === state.user._id) : [],
    userSubscriptions: state.userSubscriptions,
    petTypes: state.types.pets,
    loadingAds: state.axiosActionsInProgress.loadingAds,
    loadingUserSubscriptions: state.axiosActionsInProgress.loadingUserSubscriptions,
  }
}
  
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      deleteAd: bindActionCreators(deleteAd, dispatch),
      deleteSubscription: bindActionCreators(deleteSubscription, dispatch)
    }
  };
}
  
export default connect(mapStateToProps, mapDispatchToProps)(UserProfilePage);