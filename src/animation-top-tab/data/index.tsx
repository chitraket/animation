import {Text} from 'react-native';
import {SectionList} from '../components';

export const horizontalScrollData = [
  {id: 1, name: 'Sort'},
  {id: 2, name: 'Pizza', image: require('../public/pizza.png')},
  {id: 3, name: 'Burger', image: require('../public/hamburger.png')},
  {id: 4, name: 'Sandwich', image: require('../public/sandwich.png')},
  {id: 5, name: 'Cake', image: require('../public/cake.png')},
  {id: 6, name: 'Summer Specials', image: require('../public/ice-cream.png')},
  {id: 7, name: 'North Indian', image: require('../public/dosa.png')},
];

const pizzaData = [
  {id: 1, name: 'Pizza best', image: require('../public/pizza.png')},
  {id: 2, name: 'Pizza best:)', image: require('../public/pizza.png')},
  {id: 3, name: 'Pizza Love', image: require('../public/pizza.png')},
  {id: 4, name: 'Pizza :)', image: require('../public/pizza.png')},
  {id: 5, name: 'Pizza :)', image: require('../public/pizza.png')},
  {id: 6, name: 'Pizza :)', image: require('../public/pizza.png')},
  {id: 7, name: 'Pizza :)', image: require('../public/pizza.png')},
];

const burgerData = [
  {id: 1, name: 'burger best', image: require('../public/hamburger.png')},
  {id: 2, name: 'burger best:)', image: require('../public/hamburger.png')},
  {id: 3, name: 'burger Love', image: require('../public/hamburger.png')},
  {id: 4, name: 'burger :)', image: require('../public/hamburger.png')},
  {id: 5, name: 'burger :)', image: require('../public/hamburger.png')},
  {id: 6, name: 'burger :)', image: require('../public/hamburger.png')},
  {id: 7, name: 'burger :)', image: require('../public/hamburger.png')},
  {id: 8, name: 'burger :)', image: require('../public/hamburger.png')},
  {id: 9, name: 'burger :)', image: require('../public/hamburger.png')},
  {id: 10, name: 'burger :)', image: require('../public/hamburger.png')},
  {id: 11, name: 'burger best', image: require('../public/hamburger.png')},
  {id: 12, name: 'burger best:)', image: require('../public/hamburger.png')},
  {id: 13, name: 'burger Love', image: require('../public/hamburger.png')},
  {id: 14, name: 'burger :)', image: require('../public/hamburger.png')},
  {id: 15, name: 'burger :)', image: require('../public/hamburger.png')},
  {id: 16, name: 'burger :)', image: require('../public/hamburger.png')},
  {id: 17, name: 'burger :)', image: require('../public/hamburger.png')},
  {id: 18, name: 'burger :)', image: require('../public/hamburger.png')},
  {id: 19, name: 'burger :)', image: require('../public/hamburger.png')},
  {id: 20, name: 'burger :)', image: require('../public/hamburger.png')},
];

const sandwichData = [
  {id: 1, name: 'Sandwich best', image: require('../public/sandwich.png')},
  {id: 2, name: 'Sandwich best:)', image: require('../public/sandwich.png')},
  {id: 3, name: 'Sandwich Love', image: require('../public/sandwich.png')},
  {id: 4, name: 'Sandwich :)', image: require('../public/sandwich.png')},
];

const cakeData = [
  {id: 1, name: 'Cake best', image: require('../public/cake.png')},
  {id: 2, name: 'Cake best:)', image: require('../public/cake.png')},
  {id: 3, name: 'Cake Love', image: require('../public/cake.png')},
  {id: 4, name: 'Cake :)', image: require('../public/cake.png')},
];

const sortData = [
  {id: 1, name: 'Sort filter'},
  {id: 2, name: 'Sort pizza'},
  {id: 3, name: 'Sort burger'},
  {id: 4, name: 'Sort cake'},
];
export const verticalScrollData = [
  {id: 1, component: <SectionList data={sortData} />},
  {id: 2, name: 'Pizza', component: <SectionList data={pizzaData} />},
  {id: 3, name: 'Burger', component: <SectionList data={burgerData} />},
  {id: 4, name: 'Sandwich', component: <SectionList data={sandwichData} />},
  {id: 5, name: 'Cake', component: <SectionList data={cakeData} />},
  {id: 6, name: 'Summer Specials', component: <Text>Summer Specials</Text>},
  {id: 7, name: 'North Indian', component: <Text>North Indian</Text>},
];
