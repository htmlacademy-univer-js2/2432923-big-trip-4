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

import { getRandomArrayElement } from "../utils"
import { OFFERS, PRICES } from "../consts"

export const generateOffer = (index) => {
  return {
    id: index,
    title: getRandomArrayElement(OFFERS),
    price: getRandomArrayElement(PRICES),
  }
}
