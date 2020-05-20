export function addIconsToPetTypes(petTypes) {
  const typesWithIcons = [];
  if(!petTypes) return [];
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