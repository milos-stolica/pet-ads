import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Ad from '../components/common/Ad';
import * as adsActions from "../redux/actions/adsActions";

//controller
function AdDetails({allAds, actions}) {
  const [ad, setAd] = useState(initAd);
  const [imgUrl, setImgUrl] = useState(emptyString);
  const { id } = useParams();

  useEffect(() => {
    if(allAds.length === 0) {
      actions.loadAds();
    }
    const adDetails = allAds.find(ad => ad._id === id);
    if(adDetails) {
      setAd(adDetails);
      setImgUrl(`http://localhost:3001/ads_images/${adDetails.ad_type}/${adDetails.image_name}`);
    }
  }, [allAds, id]);
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

const emptyString = '';

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

export default connect(mapStateToProps, mapDispatchToProps) (AdDetails);