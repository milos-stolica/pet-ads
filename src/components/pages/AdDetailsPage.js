import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InfoCard from '../common/InfoCard';
import { isNotEmpty } from '../../utils/arraysHelper';
import { deleteAd } from '../../redux/actions/adsActions';
import Spinner from '../common/Spinner';

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
function AdDetailsPage({allAds, user, actions, loading}) {
  const [ad, setAd] = useState(initAd);
  const [imgUrl, setImgUrl] = useState('');
  const { id } = useParams();

  function trySetAdDetails() {
    if(isNotEmpty(allAds)){
      const adDetails = allAds.find(ad => ad._id === id);
      if(adDetails) {
        setAd(adDetails);
        setImgUrl(`http://localhost:3001/ads_images/${adDetails.ad_type}/${adDetails.image_name}`);
      }
    }
  }

  function deleteAdById(id) {
    return function handleDelete(event) {
      actions.deleteAd(id);
    };
  }

  useEffect(trySetAdDetails, [allAds, id]);

  return (
    <Container>
      {loading ? 
        <Spinner></Spinner> : (
          <>
            <h1 className='text-center'>{`${ad.type} - ${ad.state} (${ad.city})`}</h1>
            <div className="ad-details m-auto">
              <InfoCard
                id={ad._id}
                key={ad._id}
                imgUrl={imgUrl}
                title={`${ad.type} - ${ad.state} (${ad.city})`}
                description={ad.description}
                information={
                  [{name: 'Phone', value: ad.phone}, 
                  {name: 'Email', value: ad.email}, 
                  {name: 'Price', value: ad.price}]
                }
                links={
                  [{name: 'Update', address: user.loggedIn && user._id === ad.ownerId && `/new/ad/${ad._id}`},
                  {name: 'Delete', action: user.loggedIn && user._id === ad.ownerId && deleteAdById, class: 'btn-danger'}]
                }>
              </InfoCard>
            </div>
          </>
      )}
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    allAds: state.ads,
    user: state.user,
    loading: state.apisInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      deleteAd: bindActionCreators(deleteAd, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (AdDetailsPage);