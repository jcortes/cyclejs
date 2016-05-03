import Rx from 'rx';
import Cycle from '@cycle/core';
import CycleDOM from '@cycle/dom';
import CycleHTTPDriver from '@cycle/http';

const {button, h1, h4, a, div, makeDOMDriver} = CycleDOM;
// const {makeHTTPDriver} = CycleHTTP;

// DOM read effect: button clicked
// HTTP write effect: request sent
// HTTP read effect: response received
// DOM write effect: data displayed

// Logic (functional)
function main (sources) {
  const clickEvent$ = sources.DOM.select('.get-first').events('click');

  const request$ = clickEvent$.map(ev => {
    return {
      url: 'http://jsonplaceholder.typicode.com/users/1',
      method: 'GET'
    };
  });

  const response$$ = sources.HTTP
    .filter(response$ =>
      response$.request.url === 'http://jsonplaceholder.typicode.com/users/1');

  const response$ = response$$.switch();
  const firstUser$ = response$
    .map(response => response.body)
    .startWith(undefined);

  return {
    DOM: firstUser$.map(firstUser =>
      div([
        button('.get-first', 'Get first user'),
        !firstUser ? undefined : div('.user-details', [
          h1('.user-name', firstUser.name),
          h4('.user-email', firstUser.email),
          a('.user-website', {href: firstUser.website}, firstUser.website)
        ])
      ])
    ),
    // HTTP: request$
  };
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  // HTTP: makeHTTPDriver()
};

Cycle.run(main, drivers);
