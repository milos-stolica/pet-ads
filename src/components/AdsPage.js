import React, { useState, useEffect } from 'react';
import AdList from './common/AdList';
import { Container } from 'react-bootstrap';
import qs from 'query-string';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useHistory } from "react-router-dom";
import * as adsActions from "../redux/actions/adsActions";

//controller
function AdsPage ({allAds, actions, location}) {
  const [ads, setAds] = useState([]);
  const history = useHistory();

  function areAdsLoaded() {
    return allAds.length !== 0;
  }

  function loadAds() {
    if(!areAdsLoaded()) {
      actions.loadAds().then(statusCode => statusCode >= 400 && history.push(`/error/${statusCode}`));
    }
  }

  function setAdsByType() {
    if(areAdsLoaded()) {
      setAds(allAds.filter(ad => ad.ad_type === qs.parse(location.search).type));
    }
  }

  useEffect(loadAds, [allAds]);
  useEffect(setAdsByType, [allAds, location]);

  return (
    <Container> 
      <h1 className='text-center'>{`Ads - ${qs.parse(location.search).type}`}</h1>
      <AdList ads={ads}></AdList>
    </Container>   
  )
}

function mapStateToProps(state) {
  return {
    allAds: state.ads
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadAds: bindActionCreators(adsActions.loadAds, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (AdsPage);