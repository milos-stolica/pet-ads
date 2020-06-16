import React, {useState, useEffect} from 'react';
import { Container, Card } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ManageAdForm from '../forms/ManageAdForm';
import * as adsActions from '../../redux/actions/adsActions';
import { useHistory, useParams } from 'react-router-dom';
import CitiesManager from '../../services/CitiesManager';
import Validator from '../../services/Validator';
import { isNotEmpty } from '../../utils/arraysHelper';
import { host } from '../../utils/constants'
import Spinner from '../common/Spinner';
import { toast } from 'react-toastify';

//controller
function ManageAdPage(props) {
  const { allAds, allStates, types, userEmail, loading } = props;
  const { actions } = props;
  const { id } = useParams();
  const history = useHistory();
  const initializator = getStateValues();

  const [ad, setAd] = useState(initializator.getAdData());
  const [imageData, setImageData] = useState(initializator.getImageData());
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});
  const [actionInProgress, setActionInProgress] = useState(false);

  function getStateValues() {
    const initAdData = {
      description: '',
      type: '',
      ad_type: '',
      city: '',
      state: '',
      phone: '',
      email: userEmail,
      price: '',
      imageFile: null
    };

    const initImageData = { 
      imageName: 'Choose pet image', 
      imageUrl: '' 
    };

    function getInitialAdData() {
      if(!isNotEmpty(allAds)) return initAdData;
      const adForUpdate = allAds.find(ad => ad._id === id);
      if(adForUpdate) {
        return adForUpdate;
      } else {
        return initAdData;
      }
    }

    function getInitialImageData() {
      if(!isNotEmpty(allAds)) return initImageData;
      const adForUpdate = allAds.find(ad => ad._id === id);
      if(adForUpdate) {
        return { 
          imageName: 'Choose another picture', 
          imageUrl: `${host}/ads_images/${adForUpdate.ad_type}/${adForUpdate.image_name}` 
        };
      } else {
        return initImageData;
      }
    } 

    return {
      getAdData: getInitialAdData,
      getImageData: getInitialImageData,
      initAd: initAdData
    }
  }

  function initializeFormValuesOnReload() {
    setAd(initializator.getAdData());
    setImageData(initializator.getImageData());
  }

  function handleNonExistingAdId() {
    if(id !== undefined && isNotEmpty(allAds)) {
      const ad = allAds.find(ad => ad._id === id);
      !ad && history.push('/error/404');
    }
  }

  function setCitiesList() {
    const state = allStates.find(state => state.name === ad.state);
    if(state !== undefined) {
      CitiesManager.getCities(state.code, 10000).then(cities => {
        setCities(cities.map(city => city.name));
      });
    } else {
      setCities([]);
    }
  }

  function getFormErrors() {
    return Validator.getManageAdFormErrors({
      phone: ad.phone,
      city: ad.city,
      state: ad.state,
      adType: ad.ad_type,
      petType: ad.type,
      ...(ad.description && { description: ad.description }),
      ...((ad._id === undefined || ad.imageFile) && { file: ad.imageFile }),
      ...(ad.ad_type === 'For sale' && { price: ad.price})
    }, types.ads, types.pets);
  }

  function isFormValid() {
    const errors = getFormErrors();
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function handleAdTextFieldChange(event) {
    setAd({...ad, [event.target.name]: event.target.value});
  }

  function handleAdImageFileChange(event) {
    setAd({...ad, imageFile: event.target.files[0]});

    URL.revokeObjectURL(imageData.imageUrl);
    setImageData({
      imageName: event.target.files[0].name,
      imageUrl: URL.createObjectURL(event.target.files[0])
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(isFormValid()) {
      setActionInProgress(true);
      let func = ad._id ? 'updateAd' : 'addAd';
      actions[func](ad).then(statusCode => {
        setActionInProgress(false);
        statusCode < 400 ? history.push('/user/profile?showTab=ads') : history.push(`/error/${statusCode}`);
        statusCode < 400 && toast.success(`Ad successfully ${func === 'updateAd' ? 'updated' : 'saved.'}.`);
      });
    }
  }

  useEffect(handleNonExistingAdId, [allAds, id]);
  useEffect(initializeFormValuesOnReload, [allAds, id]);
  useEffect(setCitiesList, [ad.state]);
  
  return (
    <Container>
      {loading ?
        <Spinner></Spinner> : (
        <>
          <h1 className="text-center">{ad._id ? 'Update ad' : 'Add new ad'}</h1>
          <Card className="card-form">
            <Card.Body>
              <ManageAdForm 
                ad={ad} 
                onAdTextFieldChange={handleAdTextFieldChange} 
                onAdImageFileChange={handleAdImageFileChange}
                onSubmit={handleSubmit} 
                adImageData = {imageData}
                states={allStates.map(state => state.name)} 
                cities={cities}
                petTypes={types.pets}
                adTypes={types.ads} 
                errors={errors}
                actionInProgress={actionInProgress}>
              </ManageAdForm>
            </Card.Body>
          </Card>
        </>
      )}
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    allAds: state.ads,
    allStates: state.states,
    types: state.types,
    userEmail: state.user.email,
    loading: state.axiosActionsInProgress.loadingAds
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addAd: bindActionCreators(adsActions.addAd, dispatch),
      updateAd: bindActionCreators(adsActions.updateAd, dispatch),
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ManageAdPage);