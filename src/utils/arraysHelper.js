export function isNotEmpty(array) {
  if(!Array.isArray(array)) throw new Error('Invalid argument. It must be array');
  return array.length !== 0;
}

export function filterByCriteriums(array, criteriums) {
  return array.filter(object => {
    for(let criterium in criteriums) {
      if(!(object[criterium] === criteriums[criterium])) return false;
    }
    return true;
  });
}