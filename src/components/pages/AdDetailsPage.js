import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { useParams, useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Ad from '../common/Ad';
import * as adsActions from "../../redux/actions/adsActions";

const initAd = {
  description: '',
  type: '',
  ad_type: '',
  image_name: '',
  city: '',
  state: '',
  phone: '',
  email: '',
  price: ''
};

//controller
function AdDetailsPage({allAds, actions}) {
  const [ad, setAd] = useState(initAd);
  const [imgUrl, setImgUrl] = useState('');
  const { id } = useParams();
  const history = useHistory();

  function areAdsLoaded() {
    return allAds.length !== 0;
  }

  function loadAds() {
    if(!areAdsLoaded()) {
      actions.loadAds().then(statusCode => statusCode >= 400 && history.push(`/error/${statusCode}`));
    }
  }

  function trySetAdDetails() {
    if(areAdsLoaded()){
      const adDetails = allAds.find(ad => ad._id === id);
      if(adDetails) {
        setAd(adDetails);
        setImgUrl(`http://localhost:3001/ads_images/${adDetails.ad_type}/${adDetails.image_name}`);
      }
    }
  }

  useEffect(loadAds, [allAds]);
  useEffect(trySetAdDetails, [allAds, id]);

  return (
    <Container>
      <h1 className='text-center'>{`${ad.type} - ${ad.state} (${ad.city})`}</h1>
      <Ad 
        id=           {ad._id}
        key=          {ad._id}
        ad_type=      {ad.ad_type}
        pet_type=     {ad.type}  
        phone_number= {ad.phone}  
        short_desc=   {ad.description}
        email=        {ad.email}
        img_url=      {imgUrl}
        price=        {ad.price}
        state=        {ad.state}
        city=         {ad.city}>
      </Ad>
    </Container>
  );
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

export default connect(mapStateToProps, mapDispatchToProps) (AdDetailsPage);