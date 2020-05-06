import CitiesManager from '../services/CitiesManager';

export function addIconsToPetTypes(petTypes) {
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