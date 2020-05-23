import React, { useState, useEffect } from 'react';
import SelectItemBar from '../common/SelectItemBar';
import { connect } from 'react-redux';
import AdList from '../common/AdList';
import {conditionalCallbackExecution as trySetState} from '../../utils/conditionalCallbackCall';
import { isNotEmpty, filterByCriteriums } from '../../utils/arraysHelper';
import { populateCitiesDropdown } from '../../utils/homeAndAdsPageHelper';
import { addIconsToPetTypes } from '../../utils/iconsHelper';
import { host } from '../../utils/constants'
import Spinner from '../common/Spinner';

//controller
function HomePage ({allAds, allStates, types, loading}) {
  const [categoryBarItems, setCategoryBarItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All categories');

  const [petTypeBarItems, setPetTypeBarItems] = useState([]);
  const [activePetType, setActivePetType] = useState('All types');

  const [statesDropdownItems, setStatesDropdownItems] = useState([]);
  const [activeState, setActiveState] = useState('All states');

  const [citiesDropdownItems, setCitiesDropdownItems] = useState([{name: 'All cities', special: true}]);
  const [activeCity, setActiveCity] = useState('All cities');

  const [selectedAds, setSelectedAds] = useState([]);

  const [generalInfo, setGeneralInfo] = useState('');

  const categoryBarBackground = '#212529', petTypeBarBackground = '#373f47';

  function handleCategoryChange(event) {
    const filteringCriteriums = { 
      ...(event.currentTarget.name !== 'All categories' && {ad_type: event.currentTarget.name}),
      ...(activeCity !== 'All cities' && {city: activeCity}),  
      ...(activeState !== 'All states' && {state: activeState}),  
      ...(activePetType !== 'All types' && {type: activePetType}),  
    };
    setSelectedAds(filterByCriteriums(allAds, filteringCriteriums));
    setActiveCategory(event.currentTarget.name);
  }

  function handlePetTypeChange(event) {
    const filteringCriteriums = { 
      ...(event.currentTarget.name !== 'All types' && {type: event.currentTarget.name}), 
      ...(activeState !== 'All states' && {state: activeState}), 
      ...(activeCity !== 'All cities' && {city: activeCity}), 
      ...(activeCategory !== 'All categories' && {ad_type: activeCategory})
    };
    setSelectedAds(filterByCriteriums(allAds, filteringCriteriums));
    setActivePetType(event.currentTarget.name);
  }

  function handleStateChange(event) {
    const filteringCriteriums = { 
      ...(event.currentTarget.name !== 'All states' && {state: event.currentTarget.name}), 
      ...(activePetType !== 'All types' && {type: activePetType}),
      ...(activeCategory !== 'All categories' && {ad_type: activeCategory}) 
    };
    setSelectedAds(filterByCriteriums(allAds, filteringCriteriums));
    setActiveState(event.currentTarget.name);
    populateCitiesDropdown(event.currentTarget.name, allStates, setCitiesDropdownItems);
    setActiveCity('All cities');
  }

  function handleCityChange(event) {
    const filteringCriteriums = { 
      ...(event.currentTarget.name !== 'All cities' && {city: event.currentTarget.name}),  
      ...(activeState !== 'All states' && {state: activeState}), 
      ...(activePetType !== 'All types' && {type: activePetType}),
      ...(activeCategory !== 'All categories' && {ad_type: activeCategory})  
    };
    setSelectedAds(filterByCriteriums(allAds, filteringCriteriums));
    setActiveCity(event.currentTarget.name);
  }

  function setCategoryItems() {
    trySetState(isNotEmpty(types.ads), setCategoryBarItems, ['All categories', ...types.ads].map(type => {return {name: type, icon: undefined}}))
  }

  function setPetTypeItems() {
    trySetState(isNotEmpty(types.pets), setPetTypeBarItems, addIconsToPetTypes(['All types', ...types.pets]));
  }

  function setStatesDropdown() {
    trySetState(isNotEmpty(allStates), setStatesDropdownItems, [{name: 'All states'}, ...allStates].map(item => {return {name: item.name, special: item.name === 'All states'}}));
  }

  function initSelectedAds() {
    trySetState(isNotEmpty(allAds), setSelectedAds, allAds);
  }

  //******update general info*/ TODO ova se mora pozvati i u slucaju da je ads lista prazna, nekako promijeniti uslov
  function updateGeneralInfo() {
    trySetState(isNotEmpty(allAds), setGeneralInfo, `${activePetType}/${activeCategory}/${activeState}/${activeCity} : ${selectedAds.length}`);
  }

  useEffect(setCategoryItems, [types.ads]);
  useEffect(setPetTypeItems, [types.pets]);
  useEffect(setStatesDropdown, [allStates]);
  useEffect(initSelectedAds, [allAds]);
  useEffect(updateGeneralInfo, [selectedAds]);

  return (
    <>
      <img className="home-img" src={`${ host }/other_images/orange-tabby-cat-beside-fawn-short-coated-puppy-46024.jpg`} alt="Pets"></img>
      {loading ?
       <Spinner></Spinner> : (
       <>
        <SelectItemBar
          name={'petTypeSelection'}
          barItems={petTypeBarItems} 
          handleSelection={handlePetTypeChange} 
          activeItem={activePetType} 
          color={petTypeBarBackground}>
        </SelectItemBar>
        <SelectItemBar 
          name={'categorySelection'}
          barItems={categoryBarItems}
          handleSelection={handleCategoryChange} 
          activeItem={activeCategory}
          dropdown1 = {statesDropdownItems}
          dropdown1Active = {activeState} 
          handleDropdown1Selection = {handleStateChange}
          dropdown2 = {citiesDropdownItems}
          dropdown2Active = {activeCity} 
          handleDropdown2Selection = {handleCityChange}
          color={categoryBarBackground}>
        </SelectItemBar>
        <h6 className="general-info text-center my-3">{generalInfo}</h6>
        <AdList 
          ads={selectedAds} 
          lgCol={4} 
          mdCol={6}
          petTypes={types.pets}
          shouldAddModificationButtons={false}
          showPrice={activeCategory === 'For sale'}
          showImage={activeCategory === 'For sale'}>
        </AdList>
       </>
      )}
    </>
  );
}

function mapStateToProps(state) {
  return {
    allAds: state.ads,
    types: state.types,
    allStates: state.states,
    loading: state.axiosActionsInProgress.apisInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps) (HomePage);