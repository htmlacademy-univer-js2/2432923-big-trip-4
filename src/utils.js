export const getRandomArrayElement = (items) => {
  return items[Math.floor(Math.random() * items.length)];
}

export const getRandomInteger = (max, min = 0) =>{
  return Math.round((max - min) * Math.random() + min);
}
