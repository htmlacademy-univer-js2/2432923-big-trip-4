import { DESCRIPTIONS, DESTINATIONS } from '../consts';
import { getRandomArrayElement, getRandomInteger } from '../utils';

const createPicture = () => ({
  src: `https://loremflickr.com/248/152?random=${ getRandomInteger(100) }`,
  description: getRandomArrayElement(DESCRIPTIONS)
});

export const getDestination = (index) => ({
  id: index,
  description: getRandomArrayElement(DESCRIPTIONS),
  name: DESTINATIONS[index],
  pictures: Array.from({ length: getRandomInteger(5)}, createPicture)
});
