export const getRandomArrayElement = (items) => items[Math.floor(Math.random() * items.length)];

export const getRandomInteger = (max, min = 0) =>Math.round((max - min) * Math.random() + min);
