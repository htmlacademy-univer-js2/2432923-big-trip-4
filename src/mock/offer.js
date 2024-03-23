import { POINT_TYPES, OFFERS, PRICE } from '../consts';
import { getRandomArrayElement, getRandomInteger } from '../utils';

const generateOffer = (index) => ({
  id: index,
  title: getRandomArrayElement(OFFERS),
  price: getRandomInteger(PRICE.min, PRICE.max),
});

export const generateOffersByType = () => POINT_TYPES.map((type) => ({
  type,
  offers: Array.from({ length: getRandomInteger(OFFERS.length)}, (_, index) => generateOffer(index))
}));
