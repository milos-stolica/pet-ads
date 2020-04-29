import React, { useState, useEffect } from 'react';
import AdList from '../common/AdList';
import { Container } from 'react-bootstrap';
import qs from 'query-string';
import { connect } from "react-redux";

//controller
function AdsPage ({allAds, location}) {
  const [ads, setAds] = useState([]);

  function areAdsLoaded() {
    return allAds.length !== 0;
  }

  function setAdsByType() {
    if(areAdsLoaded()) {
      setAds(allAds.filter(ad => ad.ad_type === qs.parse(location.search).type));
    }
  }

  useEffect(setAdsByType, [allAds, location]);

  return (
    <Container> 
      <h1 className='text-center'>{`Ads - ${qs.parse(location.search).type}`}</h1>
      <AdList ads={ads} lgCol={4} mdCol={6}></AdList>
    </Container>   
  )
}

function mapStateToProps(state) {
  return {
    allAds: state.ads
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps) (AdsPage);