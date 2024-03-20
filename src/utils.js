export const getRandomArrayElement = (items) => {
  return items[Math.floor(Math.random() * items.length)];
}

export const getRandomInteger = (max) =>{
  return Math.round(max * Math.random());
}
