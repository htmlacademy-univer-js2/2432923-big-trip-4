import { getRandomArrayElement, getRandomInteger } from "../utils.js"
import { DESTINATIONS, DATE, POINT_TYPES, PRICES } from "../consts.js"
import { getDestination } from "./destination.js";
import { generateOffersSet } from "./offer.js";

export const generatePoint = () => {
  const identity = getRandomInteger(DESTINATIONS.length);
  const date = getRandomArrayElement(DATE);

  return {
    id: identity,
    basePrice: getRandomArrayElement(PRICES),
    dateFrom: date.from,
    dateTo: date.to,
    destination: getDestination(identity),
    isFavorite: Boolean(getRandomInteger(1)),
    offers: generateOffersSet(),
    type: getRandomArrayElement(POINT_TYPES)
  }
}

console.log(generatePoint());
