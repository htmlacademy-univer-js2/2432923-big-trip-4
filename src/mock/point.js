import { getRandomArrayElement, getRandomInteger } from '../utils.js';
import { DATE, POINT_TYPES, PRICE, DESTINATIONS } from '../consts.js';
import { getRandomDestination } from './destination.js';
import { getOfferByCurrentPointType } from './offer.js';

export const generatePoint = () => {
  const pointId = getRandomInteger(DESTINATIONS.length);
  const date = getRandomArrayElement(DATE);
  const pointType = getRandomArrayElement(POINT_TYPES);
  const offersByCurrentPointType = getOfferByCurrentPointType(pointType);

  return {
    id: pointId,
    basePrice: getRandomInteger(PRICE.min, PRICE.max),
    dateFrom: date.from,
    dateTo: date.to,
    destination: getRandomDestination(),
    isFavorite: Boolean(getRandomInteger(1)),
    offers: offersByCurrentPointType.map((offer) => offer.id),
    type: pointType
  };
};
