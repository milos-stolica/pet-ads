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

//controller
function ManageAdPage(props) {
  const { allAds, allStates, types, userEmail } = props;
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
      } else if(id !== undefined) {
        history.push('/error/404');
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
          imageUrl: `http://localhost:3001/ads_images/${adForUpdate.ad_type}/${adForUpdate.image_name}` 
        };
      } else if(id !== undefined) {
        history.push('/error/404');
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
    const errors = {};
    if(!Validator.isPhoneValid(ad.phone)) errors.phone = 'This is not valid phone number.';
    if(ad.ad_type === 'For sale' && !Validator.valueInRange(ad.price, 0)) errors.price = 'Price must be number greater or equal to zero.';
    if(!Validator.hasNotNumberOrSpecialCh(ad.city) || !Validator.lengthInRange(ad.city, 0 , 50)) errors.city = 'This is not valid city name.';
    if(!Validator.hasNotNumberOrSpecialCh(ad.state) || !Validator.lengthInRange(ad.state, 0 , 50)) errors.state = 'This is not valid state name.';
    if(!Validator.typeValid(ad.ad_type, types.ads)) errors.ad_type = 'This is not valid ad type.';
    if(!Validator.typeValid(ad.type, types.pets)) errors.type = 'This pet type is not supported yet.';
    if(ad._id === undefined && !Validator.isImage(ad.imageFile)) errors.file = 'Only images of png, jpeg or webp types are allowed.';
    if(!Validator.lengthInRange(ad.description)) errors.description = 'Description allow up to 1000 characters.';
    return errors;
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
      let func = ad._id !== undefined ? 'updateAd' : 'addAd';
      actions[func](ad).then(statusCode => {
        setActionInProgress(false);
        statusCode < 400 ? history.push(`/ads?type=${ad.ad_type}`) : history.push(`/error/${statusCode}`);
      });
    }
  }

  useEffect(initializeFormValuesOnReload, [allAds, id]);
  useEffect(setCitiesList, [ad.state]);

  return (
    <Container>
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
    </Container>
  );
}

function mapStateToProps(state) {
  return {
    allAds: state.ads,
    allStates: state.states,
    types: state.types,
    userEmail: state.user.email
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