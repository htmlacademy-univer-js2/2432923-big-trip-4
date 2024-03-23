//В зависимости от типа точки маршрута пользователь может выбрать дополнительные опции (offers)
// [
//   {
//     "type": "taxi",
//     "offers": [
//       {
//         "id": "b4c3e4e6-9053-42ce-b747-e281314baa31",
//         "title": "Upgrade to a business class",
//         "price": 120
//       }
//     ]
//   }
// ]

// import { getRandomArrayElement } from "../utils"
// import { OFFERS, PRICES } from "../consts"

// export const generateOffer = (index) => {
//   return {
//     id: index,
//     title: getRandomArrayElement(OFFERS),
//     price: getRandomArrayElement(PRICES),
//   }
// }


// const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
// const OFFERS = ['Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats', 'Travel by train'];
// const PRICES = [1000, 1200, 80, 90, 50, 600];
// const getRandomArrayElement = (items) => {
//   return items[Math.floor(Math.random() * items.length)];
// }
// const getRandomInteger = (max) =>{
//   return Math.round(max * Math.random());
// }

import { POINT_TYPES, OFFERS, PRICE } from "../consts"
import { getRandomArrayElement, getRandomInteger } from "../utils"

const generateOffer = (index) => {
  return {
    id: index,
    title: getRandomArrayElement(OFFERS),
    price: getRandomInteger(PRICE.min, PRICE.max),
  }
}

// export const generateOffersSet = () => {
//   return Array.from({ length: getRandomInteger(OFFERS.length)}, (_, index) => generateOffer(index))
// }

export const generateOffersByType = () => {
  return POINT_TYPES.map((type) => ({
    type,
    offers: Array.from({ length: getRandomInteger(OFFERS.length)}, (_, index) => generateOffer(index))
  }))
}


// const generateOffersSetByPointType = () => {
//   return POINT_TYPES.map((pointType) => ({
//     type: pointType,
//     offers: generateOffersSet(),
//   }))
// }

//console.log(generateOffersSetByPointType());
