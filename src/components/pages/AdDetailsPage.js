import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import Ad from '../common/Ad';

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
function AdDetailsPage({allAds, userLoggedIn}) {
  const [ad, setAd] = useState(initAd);
  const [imgUrl, setImgUrl] = useState('');
  const { id } = useParams();

  function areAdsLoaded() {
    return allAds.length !== 0;
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

  useEffect(trySetAdDetails, [allAds, id]);

  return (
    <Container>
      <h1 className='text-center'>{`${ad.type} - ${ad.state} (${ad.city})`}</h1>
      <div className="ad-details m-auto">
        <Ad 
          id={ad._id}
          key={ad._id}
          ad_type={ad.ad_type}
          pet_type={ad.type}  
          phone_number={ad.phone}  
          short_desc={ad.description}
          email={ad.email}
          img_url={imgUrl}
          price={ad.price}
          state={ad.state}
          city={ad.city}
          shouldAddModificationButtons={userLoggedIn}>
        </Ad>
      </div>
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    allAds: state.ads,
    userLoggedIn: state.user.loggedIn
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps) (AdDetailsPage);