import React, {useState, useEffect} from 'react';
import { Container, Card } from 'react-bootstrap'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import ManageAdForm from './ManageAdForm';
import * as adsActions from "../redux/actions/adsActions";
import * as statesActions from "../redux/actions/statesActions"
import * as typesActions from "../redux/actions/typesActions"
import { useHistory, useParams } from "react-router-dom";
import CitiesManager from "../services/CitiesManager";
import Validator from '../services/Validator';

//controller
function ManageAdPage ({allAds, allStates, types, actions}) {
  const [ad, setAd] = useState(initAd);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [imgUrl, setImgUrl] = useState(emptyString);
  const [cities, setCities] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    if(allAds.length === 0) {
      actions.loadAds();
    } else {
      const adForUpdate = allAds.find(ad => ad._id === id);
      if(adForUpdate) {
        setAd(adForUpdate);
        setImgUrl(`http://localhost:3001/ads_images/${adForUpdate.ad_type}/${adForUpdate.image_name}`);
      } else {
        history.push('/ad');
        setAd(initAd);
        setImgUrl(emptyString);
      }
    }
  }, [allAds, id]);

  useEffect(() => {
    if(allStates.length === 0) {
      actions.loadStates();
    }
    if(types.ads.length === 0) {
      actions.loadAdTypes();
    }

    if(types.pets.length === 0) {
      actions.loadPetTypes();
    }
  }, []);

  function handleChange(event) {
    setAd({
      ...ad,
      [event.target.name]: event.target.files ? event.target.files[0].name : event.target.value
    });
    if(event.target.files) {
      setFile(event.target.files[0]);
      URL.revokeObjectURL(imgUrl);
      setImgUrl(URL.createObjectURL(event.target.files[0]));
    }
    if(event.target.name === 'state') {
      const state = allStates.find(state => state.name === event.target.value)
      if(state !== undefined) {
        CitiesManager.getCities(state.code, 10000).then(cities => {
          setCities(cities.map(city => city.name));
        });
      } else {
        setCities([]);
      }
      
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(isFormValid()) {
      console.log('Form is valid and will be submitted soon...');
      let func = ad._id !== undefined ? 'updateAd' : 'addAd';
      actions[func](ad, file);//to do catch bi ovde trebao da bude attachovan na promise koji se vraca iz funkcije
      history.push(`/ads?type=${ad.ad_type}`);
    }
  }

  function isFormValid() {
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
    setErrors(errors);
    return Object.keys(errors).length === 0;
  }

  return (
    <Container>
      <h1 className="text-center">{ad._id ? 'Update ad' : 'Add new ad'}</h1>
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
const emptyString = '';

export default connect(mapStateToProps, mapDispatchToProps) (ManageAdPage);