import _ from 'lodash';

import fetchHnTopStories from './fetchHnTopStories';

// console.log('window', window);
//
// function component() {
//   if (!window) { return; }
//
//   let element = document.createElement('div');
//
//   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//
//   return element;
// }
//
// if (window) {
//   document.body.appendChild(component());
// }

global.fetchHnTopStories = fetchHnTopStories;

