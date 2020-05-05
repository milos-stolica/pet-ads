import React, { useState, useEffect } from 'react';
import SelectItemBar from '../common/SelectItemBar';
import { connect } from 'react-redux';
import AdList from '../common/AdList';
import CitiesManager from '../../services/CitiesManager';

//controller
function HomePage ({allAds, allStates, types, location}) {
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

  function areAdTypesLoaded() {
    return types.ads.length !== 0;
  }

  function arePetTypesLoaded() {
    return types.pets.length !== 0
  }

  function areStatesLoaded() {
    return allStates.length !== 0
  }

  function areAdsLoaded() {
    return allAds.length !== 0;
  }

  //********Handle category bar items*/
  const categoryBarBackground = '#8e1a9e';

  function setCategoryItems() {
    if(areAdTypesLoaded()) {
      setCategoryBarItems(['All categories', ...types.ads].map(type => {return {name: type, icon: undefined}}));
    }
  }
  //********Handle category bar items*/

  //********Handle pet type bar items */
  const petTypeBarBackground = '#ec38d7';

  function setPetTypeItems() {
    if(arePetTypesLoaded()) {
      setPetTypeBarItems(addIconsToPetTypes(['All types', ...types.pets]));
    }
  }

  function addIconsToPetTypes(petTypes) {
    const typesWithIcons = [];
    petTypes.forEach(type => {
      switch (type) {
        case 'All types':
          typesWithIcons.push({name: type, icon: 'faBoxOpen'});
          break;
        case 'Dog':
          typesWithIcons.push({name: type, icon: 'faBone'});
          break;
        case 'Cat':
          typesWithIcons.push({name: type, icon: 'faCat'});
          break;
        case 'Rabbit':
          typesWithIcons.push({name: type, icon: 'faCarrot'});
          break;
        case 'Fish':
          typesWithIcons.push({name: type, icon: 'faFish'});
          break;
        case 'Parrot':
          typesWithIcons.push({name: type, icon: 'faFeatherAlt'});
          break;
        case 'Hamster':
          typesWithIcons.push({name: type, icon: 'faSync'});
          break;
        default:
          break;
      }
    });
    return typesWithIcons;
  }
  //********Handle pet type bar items */

  //*******Handle states dropdown items*/
  function populateStatesDropdown() {
    if(areStatesLoaded()) {
      setStatesDropdownItems([{name: 'All states'}, ...allStates].map(item => {return {name: item.name, special: item.name === 'All states'}}));
    }
  }

  //*******Handle city dropdown items*/
  function populateCitiesDropdown(stateName) {
    const state = allStates.find(state => state.name === stateName);
    if(state !== undefined) {
      CitiesManager.getCities(state.code, 10000).then(cities => {
        setCitiesDropdownItems([{name: 'All cities', special: true}, ...cities.map(city => {return {name: city.name, special: false}})]);
      });
    } else {
      setCitiesDropdownItems([{name: 'All cities', special: true}]);
    }
  }

  //*******Initialize ads list*/
  function initSelectedAds() {
    if(areAdsLoaded()) {
      setSelectedAds(getAdsFilteredByCategory('All categories'));
    }
  }

  //******update general info*/
  function updateGeneralInfo() {
    if(areAdsLoaded()) {
      setGeneralInfo(`${activePetType}/${activeCategory}/${activeState}/${activeCity} : ${selectedAds.length}`);
    }
  }

  //*******Filtering methods */
  function getAdsFilteredByCategory(category) {
    const filteredByOtherCriteriums = allAds.filter(ad => {
      return (ad.type === activePetType || activePetType === 'All types') && 
             (ad.state === activeState || activeState === 'All states') &&
             (ad.city === activeCity || activeCity === 'All cities')
    });
    return category === 'All categories' ? filteredByOtherCriteriums : filteredByOtherCriteriums.filter(ad => ad.ad_type === category);
  }

  function getAdsFilteredByPetType(petType) {
    const filteredByOtherCriteriums = allAds.filter(ad => {
      return (ad.ad_type === activeCategory || activeCategory === 'All categories') && 
             (ad.state === activeState || activeState === 'All states') &&
             (ad.city === activeCity || activeCity === 'All cities')
    });
    return petType === 'All types' ? filteredByOtherCriteriums : filteredByOtherCriteriums.filter(ad => ad.type === petType);
  }

  function getAdsFilteredByState(state) {
    const filteredByOtherCriteriums = allAds.filter(ad => {
      return (ad.type === activePetType || activePetType === 'All types') &&
             (ad.ad_type === activeCategory || activeCategory === 'All categories')
    });
    return state === 'All states' ? filteredByOtherCriteriums : filteredByOtherCriteriums.filter(ad => ad.state === state);
  }

  function getAdsFilteredByCity(city) {
    const filteredByOtherCriteriums = allAds.filter(ad => {
      return (ad.type === activePetType || activePetType === 'All types') &&
             (ad.ad_type === activeCategory || activeCategory === 'All categories') && 
             (ad.state === activeState || activeState === 'All states')
    });
    return city === 'All cities' ? filteredByOtherCriteriums : filteredByOtherCriteriums.filter(ad => ad.city === city);
  }
  //*******Filtering methods */

  //*******Event handlers*/
  function handleCategoryChange(event) {
    setSelectedAds(getAdsFilteredByCategory(event.currentTarget.name));
    setActiveCategory(event.currentTarget.name);
  }

  function handlePetTypeChange(event) {
    setSelectedAds(getAdsFilteredByPetType(event.currentTarget.name));
    setActivePetType(event.currentTarget.name);
  }

  function handleStateChange(event) {
    setSelectedAds(getAdsFilteredByState(event.currentTarget.name));
    setActiveState(event.currentTarget.name);
    populateCitiesDropdown(event.currentTarget.name);
    setActiveCity('All cities');
  }

  function handleCityChange(event) {
    setSelectedAds(getAdsFilteredByCity(event.currentTarget.name));
    setActiveCity(event.currentTarget.name);
  }
  //*******Event handlers*/

  useEffect(setCategoryItems, [types.ads]);
  useEffect(setPetTypeItems, [types.pets]);
  useEffect(populateStatesDropdown, [allStates]);
  useEffect(initSelectedAds, [allAds, location]);
  useEffect(updateGeneralInfo, [selectedAds]);

  return (
    <>
      <img className="home-img" src="http://localhost:3001/other_images/orange-tabby-cat-beside-fawn-short-coated-puppy-46024.jpg" alt="Pets"></img>
      <SelectItemBar
        barItems={petTypeBarItems} 
        handleSelection={handlePetTypeChange} 
        activeItem={activePetType} 
        color={petTypeBarBackground}>
      </SelectItemBar>
      <SelectItemBar 
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
        shouldAddModificationButtons={false}>
      </AdList>
    </>
  );
}

function mapStateToProps(state) {
  return {
    allAds: state.ads,
    types: state.types,
    allStates: state.states
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {}
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (HomePage);