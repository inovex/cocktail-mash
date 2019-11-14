// tslint:disable

const ADJECTIVES = [
    'Funky',
    'Prancing',
    'Light',
    'Long',
    'Neat',
    'Sparkling',
    'Stiff',
    'Still',
    'Vintage',
    'Soft',
    'Cool',
    'Bitter',
    'Quick',
    'Fuzzy'
];

const DRINK_NAMES = [
    'Fizzer',
    'Gulp',
    'Slurp',
    'Crush',
    'Punch',
    'Buzz',
    'Flash',
    'Splash',
    'Sour',
    'Shot',
    'Delight',
    'Stinger',
    'Dream',
    'Shandy',
    'Sunset',
    'Tincture',
    'Goblet',
    'Royale',
    'Grog',
    'Toddy',
    'Blitz',
    'Chiller',
    'Spritz'
];

export const getRandomDrink = () => {
    const randomSuffix = DRINK_NAMES[(DRINK_NAMES.length * Math.random()) << 0];
  
    const randomAdjective =
      ADJECTIVES[(ADJECTIVES.length * Math.random()) << 0];
  
    return `${randomAdjective} ${randomSuffix}`;
  };
  
export default getRandomDrink;
