import React, {useState, useEffect} from 'react';
import { Container, Card } from 'react-bootstrap'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ManageAdForm from '../forms/ManageAdForm';
import * as adsActions from "../../redux/actions/adsActions";
import * as statesActions from "../../redux/actions/statesActions"
import * as typesActions from "../../redux/actions/typesActions"
import { useHistory, useParams } from "react-router-dom";
import CitiesManager from "../../services/CitiesManager";
import Validator from '../../services/Validator';

const initAd = {
  description: '',
  type: '',
  ad_type: '',
  image_name: 'Choose pet image',
  city: '',
  state: '',
  phone: '',
  email: '',
  price: ''
};

//controller
function ManageAdPage ({allAds, allStates, types, actions}) {
  const [ad, setAd] = useState(initAd);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [imgUrl, setImgUrl] = useState('');
  const [cities, setCities] = useState([]);
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

  function loadStates() {
    if(allStates.length === 0) {
      actions.loadStates().then(statusCode => statusCode >= 400 && history.push(`/error/${statusCode}`));
    }
  }

  function loadAdTypes() {
    if(types.ads.length === 0) {
      actions.loadAdTypes().then(statusCode => statusCode >= 400 && history.push(`/error/${statusCode}`));
    }
  }

  function loadPetTypes() {
    if(types.pets.length === 0) {
      actions.loadPetTypes().then(statusCode => statusCode >= 400 && history.push(`/error/${statusCode}`));
    }
  }

  //TODO ovde si stao trebas da rijesis problem poziva ove metode nakon sto se odradi history push na ads?type=
  function initializeFormFieldValues() {
    if(areAdsLoaded()) {
      const adForUpdate = allAds.find(ad => ad._id === id);
      if(adForUpdate) {
        setAd(adForUpdate);
        setImgUrl(`http://localhost:3001/ads_images/${adForUpdate.ad_type}/${adForUpdate.image_name}`);
      } else if(id !== undefined) {
        history.push('/error/404');
      } else {
        setAd(initAd);
        setImgUrl('');
      }
    }
  }

  function getFormErrors() {
    const errors = {};
    if(!Validator.isEmailValid(ad.email)) errors.email = 'This is not valid email address.';
    if(!Validator.isPhoneValid(ad.phone)) errors.phone = 'This is not valid phone number.';
    if(ad.ad_type === 'Sell' && !Validator.valueInRange(ad.price, 0)) errors.price = 'Price must be number greater or equal to zero.';
    if(!Validator.onlyLetters(ad.city) || !Validator.lengthInRange(ad.city, 0 , 50)) errors.city = 'This is not valid city name.';
    if(!Validator.onlyLetters(ad.state) || !Validator.lengthInRange(ad.state, 0 , 50)) errors.state = 'This is not valid state name.';
    if(!Validator.typeValid(ad.ad_type, types.ads)) errors.ad_type = 'This is not valid ad type.';
    if(!Validator.typeValid(ad.type, types.pets)) errors.type = 'This pet type is not supported yet.';
    if(ad._id === undefined && !Validator.isImage(file)) errors.file = 'Only images of png, jpeg or webp types are allowed.';
    if(!Validator.lengthInRange(ad.description)) errors.description = 'Description allow up to 1000 characters.';
    return errors;
  }

  function isFormValid() {
    const errors = getFormErrors();
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  function trySetFileAndImage(event) {
    if(event.target.files) {
      setFile(event.target.files[0]);
      URL.revokeObjectURL(imgUrl);
      setImgUrl(URL.createObjectURL(event.target.files[0]));
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

  useEffect(loadAds, []);
  useEffect(initializeFormFieldValues, [allAds, id]);
  useEffect(loadStates, []);
  useEffect(loadAdTypes, []);
  useEffect(loadPetTypes, []);
  useEffect(setCitiesList, [allStates, ad.state]);

  function handleChange(event) {
    setAd({...ad, [event.target.name]: event.target.files ? event.target.files[0].name : event.target.value});
    trySetFileAndImage(event);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(isFormValid()) {
      console.log('Form is valid and will be submitted soon...');
      let func = ad._id !== undefined ? 'updateAd' : 'addAd';
      actions[func](ad, file).then(statusCode => {
        statusCode < 400 ? history.push(`/ads?type=${ad.ad_type}`) : history.push(`/error/${statusCode}`);
      });
    }
  }

  return (
    <Container>
      <h1>{ad._id ? 'UPDATE AD' : 'ADD NEW AD'}</h1>
      <Card>
        <Card.Body>
          <ManageAdForm 
            ad={ad} 
            imageUrl={imgUrl} 
            states={allStates.map(state => state.name)} 
            cities={cities}
            petTypes={types.pets}
            adTypes={types.ads} 
            onChange={handleChange} 
            onSubmit={handleSubmit} 
            errors={errors}>
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
    types: state.types
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadAds: bindActionCreators(adsActions.loadAds, dispatch),
      addAd: bindActionCreators(adsActions.addAd, dispatch),
      updateAd: bindActionCreators(adsActions.updateAd, dispatch),
      loadStates: bindActionCreators(statesActions.loadStates, dispatch),
      loadAdTypes: bindActionCreators(typesActions.loadAdTypes, dispatch),
      loadPetTypes: bindActionCreators(typesActions.loadPetTypes, dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ManageAdPage);