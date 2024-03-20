export const getRandomArrayElement = (items) => {
  return items[Math.floor(Math.random() * items.length)];
}

export const getRandomInteger = (min = 0, max) =>{
  return Math.round((max - min) * Math.random() + min);
}
