import { DESCRIPTIONS, DESTINATIONS } from "../consts";
import { getRandomArrayElement } from "../utils";

// const getDestination = (destination, index) => {
//   return {
//     id: index,
//     description: getRandomArrayElement(DESCRIPTIONS),
//     name: destination,
//     pictures: [
//       {
//         src: `https://loremflickr.com/248/152?random=${ index }`,
//         description: getRandomArrayElement(DESCRIPTIONS)
//       }
//     ]
//   }
// }

// const destinations = DESTINATIONS.map(() => getDestination(destination, index));

// const getRandomDestination = () => {
//   getRandomArrayElement(destinations);
// }

export const getDestination = (index) => {
  return {
    id: index,
    description: getRandomArrayElement(DESCRIPTIONS),
    name: DESTINATIONS[index],
    pictures: [
      {
        src: `https://loremflickr.com/248/152?random=${ index }`,
        description: getRandomArrayElement(DESCRIPTIONS)
      }
    ]
  }
}
