// [
//   {
//     "id": "f4b62099-293f-4c3d-a702-94eec4a2808c",
//     "base_price": 1100,
//     "date_from": "2019-07-10T22:55:56.845Z",
//     "date_to": "2019-07-11T11:22:13.375Z",
//     "destination": "bfa5cb75-a1fe-4b77-a83c-0e528e910e04",
//     "is_favorite": false,
//     "offers": [
//       "b4c3e4e6-9053-42ce-b747-e281314baa31"
//     ],
//     "type": "taxi"
//   }
// ]

import { getRandomArrayElement, getRandomInteger } from "../utils.js"
import { DESTINATIONS, DATE, OFFERS, POINT_TYPES, PRICES } from "../consts.js"
import { getDestination } from "./destination.js";
import { generateOffer } from "./offer.js";


// const DESCRIPTIONS = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.',
//                              'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.',
//                              'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
//                              'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.',
//                              'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];
// const getRandomArrayElement = (items) => {
//   return items[Math.floor(Math.random() * items.length)];
// }
// const getRandomInteger = (max) =>{
//   return Math.round(max * Math.random());
// }
// const POINT_TYPES = ['Taxi', 'Bus', 'Train', 'Ship', 'Drive', 'Flight', 'Check-in', 'Sightseeing', 'Restaurant'];
// const DESTINATIONS = ['Amsterdam', 'Chamonix', 'Geneva', 'Paris', 'Saint Petersburg', 'Vienna'];
// const OFFERS = ['Add luggage', 'Switch to comfort class', 'Add meal', 'Choose seats', 'Travel by train'];
// const DATE = [
//   {
//     from: '2024-03-18T10:30',
//     to: '2024-03-18T16:00'
//   },
//   {
//     from: '2024-03-18T16:20',
//     to: '2024-03-18T17:00'
//   },
//   {
//     from: '2024-03-19T14:20',
//     to: '2024-03-19T15:00'
//   },
//   {
//     from: '2024-03-19T16:00',
//     to: '2024-03-19T17:00'
//   },
//   {
//     from: '2024-03-19T18:00',
//     to: '2024-03-19T19:00'
//   }
// ]
// const PRICES = [1000, 1200, 80, 90, 50, 600];
// const getDestination = (index) => {
//   return {
//     id: index,
//     description: getRandomArrayElement(DESCRIPTIONS),
//     name: DESTINATIONS[index],
//     pictures: [
//       {
//         src: `https://loremflickr.com/248/152?random=${ index }`,
//         description: getRandomArrayElement(DESCRIPTIONS)
//       }
//     ]
//   }
// }
// const generateOffer = (index) => {
//   return {
//     id: index++,
//     title: getRandomArrayElement(OFFERS),
//     price: getRandomArrayElement(PRICES),
//   }
// }


const genereatePoint = () => {
  const identity = getRandomInteger(DESTINATIONS.length);
  const date = getRandomArrayElement(DATE);
  const pointType = getRandomArrayElement(POINT_TYPES);

  return {
    id: identity,
    basePrice: getRandomArrayElement(PRICES),
    dateFrom: date.from,
    dateTo: date.to,
    destination: getDestination(identity),
    isFavorite: Boolean(getRandomInteger(1)),
    //offers: ,
    // offers: Array.from({ length: getRandomInteger(OFFERS.length)}, () => getRandomArrayElement(OFFERS)),
    type: getRandomArrayElement(POINT_TYPES)
  }
}


console.log(genereatePoint());
