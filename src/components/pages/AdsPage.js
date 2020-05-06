import React, { useState, useEffect } from 'react';
import AdList from '../common/AdList';
import SelectItemBar from '../common/SelectItemBar';
import qs from 'query-string';
import { connect } from "react-redux";
import {conditionalCallbackExecution as trySetState} from '../../utils/conditionalCallbackCall';
import { isNotEmpty, filterByCriteriums } from '../../utils/arraysHelper';
import { addIconsToPetTypes, populateCitiesDropdown } from '../../utils/homeAndAdsPageHelper';

//controller
function AdsPage ({allAds, allStates, types, location}) {
  const adsCategory = qs.parse(location.search).type;
  
  const [activeCategory, setActiveCategory] = useState(adsCategory);

  const [petTypeBarItems, setPetTypeBarItems] = useState([]);
  const [activePetType, setActivePetType] = useState('All types');

  const [statesDropdownItems, setStatesDropdownItems] = useState([]);
  const [activeState, setActiveState] = useState('All states');

  const [citiesDropdownItems, setCitiesDropdownItems] = useState([{name: 'All cities', special: true}]);
  const [activeCity, setActiveCity] = useState('All cities');

  const [selectedAds, setSelectedAds] = useState([]);

  const [generalInfo, setGeneralInfo] = useState('');

  const petTypeBarBackground = '#212529';

  function handlePetTypeChange(event) {
    const filteringCriteriums = { type: event.currentTarget.name, state: activeState, city: activeCity, ad_type: activeCategory};
    setSelectedAds(filterByCriteriums(allAds, filteringCriteriums));
    setActivePetType(event.currentTarget.name);
  }

  function handleStateChange(event) {
    const filteringCriteriums = { state: event.currentTarget.name, type: activePetType, ad_type: activeCategory};
    setSelectedAds(filterByCriteriums(allAds, filteringCriteriums));
    setActiveState(event.currentTarget.name);
    populateCitiesDropdown(event.currentTarget.name, allStates, setCitiesDropdownItems);
    setActiveCity('All cities');
  }

  function handleCityChange(event) {
    const filteringCriteriums = { city: event.currentTarget.name, state: activeState, type: activePetType, ad_type: activeCategory};
    setSelectedAds(filterByCriteriums(allAds, filteringCriteriums));
    setActiveCity(event.currentTarget.name);
  }

  function setPetTypeItems() {
    trySetState(isNotEmpty(types.pets), setPetTypeBarItems, addIconsToPetTypes(['All types', ...types.pets]));
  }

  function setStatesDropdown() {
    trySetState(isNotEmpty(allStates), setStatesDropdownItems, [{name: 'All states'}, ...allStates].map(item => {return {name: item.name, special: item.name === 'All states'}}));
  }

  function updateActiveCategory() {
    setActiveCategory(adsCategory);
  }

  function initSelectedAds() {
    const filteringCriteriums = { city: activeCity, state: activeState, type: activePetType, ad_type: activeCategory};
    trySetState(isNotEmpty(allAds), setSelectedAds, filterByCriteriums(allAds, filteringCriteriums));
  }

  //TODO izmijeniti uslov kao sto je napisano i u HomePage
  function updateGeneralInfo() {
    trySetState(isNotEmpty(allAds), setGeneralInfo, `${activePetType}/${activeCategory}/${activeState}/${activeCity} : ${selectedAds.length}`);
  }

  useEffect(setPetTypeItems, [types.pets]);
  useEffect(setStatesDropdown, [allStates]);
  useEffect(updateActiveCategory, [adsCategory]);
  useEffect(initSelectedAds, [allAds, activeCategory]);
  useEffect(updateGeneralInfo, [selectedAds, activeCategory]);

  return (
    <>
      <SelectItemBar 
        barItems={petTypeBarItems}
        handleSelection={handlePetTypeChange} 
        activeItem={activePetType}
        dropdown1 = {statesDropdownItems}
        dropdown1Active = {activeState} 
        handleDropdown1Selection = {handleStateChange}
        dropdown2 = {citiesDropdownItems}
        dropdown2Active = {activeCity} 
        handleDropdown2Selection = {handleCityChange}
        color={petTypeBarBackground}>
      </SelectItemBar>
      <h6 className="general-info text-center my-3">{generalInfo}</h6>
      <AdList 
        ads={selectedAds} 
        lgCol={4} 
        mdCol={6}
        shouldAddModificationButtons={false}>
      </AdList>
    </>  
  )
}

function mapStateToProps(state) {
  return {
    allAds: state.ads,
    types: state.types,
    allStates: state.states
  }
}

function mapDispatchToProps(dispatch) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps) (AdsPage);