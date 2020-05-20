import React, {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import InfoCard from '../common/InfoCard';
import { isNotEmpty } from '../../utils/arraysHelper';
import { getFormatedDateTimeFromISOTime } from '../../utils/dateTimeFormater';
import { deleteAd } from '../../redux/actions/adsActions';
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

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
function AdDetailsPage(props) {
  const {allAds, user, actions, loading} = props;
  const { id } = useParams();
  const history = useHistory();

  const [ad, setAd] = useState(initAd);
  const [imgUrl, setImgUrl] = useState('');
  const [deleteAdInProgress, setDeleteAdInProgress] = useState(false);

  function getAdTitle(petType, state, city) {
    return `${petType} - ${state} (${city})`;
  }

  function getAdInformation(phone, email, price) {
    return [{ name: 'Phone', value: phone },
            { name: 'Email', value: email },
            { name: 'Price', value: price }];
  }

  function getLinkButtons() {
    return [{ name: 'Update', 
              address: user.loggedIn && user._id === ad.ownerId && `/new/ad/${ad._id}`},
            { name: 'Delete',
              transitionName: 'Deleting...', 
              transition: deleteAdInProgress, 
              action: user.loggedIn && user._id === ad.ownerId && deleteAdById, 
              class: 'btn-danger' }];
  }

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
      setDeleteAdInProgress(true);
      actions.deleteAd(id).then(() => {
        setDeleteAdInProgress(false);
        history.push('/user/profile?showTab=ads');
        toast.success('Ad successfully deleted.');
      });
    };
  }

  function handleNonExistingAdId() {
    if(id !== undefined && isNotEmpty(allAds)) {
      const ad = allAds.find(ad => ad._id === id);
      !ad && history.push('/error/404');
    }
  }

  useEffect(handleNonExistingAdId, [allAds, id]);
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
              date={getFormatedDateTimeFromISOTime(ad.updatedAt)}
              title={getAdTitle(ad.type, ad.state, ad.city)}
              description={ad.description}
              information={getAdInformation(ad.phone, ad.email, ad.price)}
              links={getLinkButtons()}>
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
    loading: state.axiosActionsInProgress.loadingAds
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