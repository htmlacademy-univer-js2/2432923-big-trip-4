import { getRandomArrayElement, getRandomInteger } from '../utils.js';
import { DESTINATIONS, DATE, POINT_TYPES, PRICE } from '../consts.js';
import { getDestination } from './destination.js';
import { generateOffersByType } from './offer.js';

export const generatePoint = () => {
  const pointId = getRandomInteger(DESTINATIONS.length - 1);
  const date = getRandomArrayElement(DATE);
  const pointType = getRandomArrayElement(POINT_TYPES);
  const offersByType = generateOffersByType();
  // console.log(offersByType);
  const offersByCurrentPointType = (offersByType.find((offer) => offer.type === pointType).offers);
  //.map((offer) => offer.id);
  // console.log(offersByCurrentPointType);

  return {
    id: pointId,
    basePrice: getRandomInteger(PRICE.min, PRICE.max),
    dateFrom: date.from,
    dateTo: date.to,
    destination: getDestination(pointId),
    isFavorite: Boolean(getRandomInteger(1)),
    offers: offersByCurrentPointType,
    type: pointType
  };
};

//console.log(generatePoint());
