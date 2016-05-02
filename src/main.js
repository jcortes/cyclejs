import {Rx} from 'rx';
import Cycle from '@cycle/core';
import CycleDOM from '@cycle/dom';

const {h, h1, span, makeDOMDriver} = CycleDOM;


// Logic (functional)
function main (sources) {
  const click$ = sources.DOM.select('span').events('mouseover');
  return {
    DOM: click$
      .startWith(undefined)
      .flatMapLatest(() =>
        Rx.Observable.timer(0, 1000)
        .map(i =>
          h1([
            span([
              `Seconds elapsed ${i}`
            ])
          ])
        )
      ),
    Log: Rx.Observable.timer(0, 2000)
      .map(i => i * 2)
  }
}

// Effects (imperative)
// function makeDOMDriver (mountSelector) {
//   return function DOMDriver (obj$) {
//     function createElement (obj) {
//       const element = document.createElement(obj.tagName);
//       obj.children
//         .filter(c => typeof c === 'object')
//         .map(createElement)
//         .forEach(c => element.appendChild(c));
//       obj.children
//         .filter(c => typeof c === 'string')
//         .forEach(c => element.innerHTML += c);
//       return element;
//     }
//
//     obj$.subscribe(obj => {
//       const container = document.querySelector(mountSelector);
//       container.innerHTML = '';
//       const element = createElement(obj);
//       container.appendChild(element);
//     });
//
//     const DOMSource = {
//       selectEvents: function (tagName, eventType) {
//         return Rx.Observable.fromEvent(document, eventType)
//           .filter(ev => ev.target.tagName === tagName.toUpperCase());
//       }
//     };
//     return DOMSource;
//   };
// }

function consoleLogDriver (msg$) {
  msg$.subscribe(msg => console.log(msg));
}

const drivers = {
  DOM: makeDOMDriver('#app'),
  Log: consoleLogDriver
};

Cycle.run(main, drivers);
