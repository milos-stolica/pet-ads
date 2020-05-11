import CitiesManager from '../services/CitiesManager';

export function populateCitiesDropdown(stateName, allStates, setCitiesDropdownItems) {
  const state = allStates.find(state => state.name === stateName);
  if(state !== undefined) {
    CitiesManager.getCities(state.code, 10000).then(cities => {
      setCitiesDropdownItems([{name: 'All cities', special: true}, ...cities.map(city => {return {name: city.name, special: false}})]);
    });
  } else {
    setCitiesDropdownItems([{name: 'All cities', special: true}]);
  }
}