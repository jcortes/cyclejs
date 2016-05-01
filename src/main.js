import {Rx} from 'rx';
import Cycle from '@cycle/core';

// Logic (functional)
function main (sources) {
  const click$ = sources.DOM;
  return {
    DOM: click$
      .startWith(undefined)
      .flatMapLatest(() =>
        Rx.Observable.timer(0, 1000)
        .map((i) => `Seconds elapsed ${i}`)
      ),
    Log: Rx.Observable.timer(0, 2000)
      .map(i => i * 2)
  }
}

// source: input (read) effects
// sink: output (write) effects

// Effects (imperative)
function DOMDriver (text$) {
  text$.subscribe(text => {
    const container = document.querySelector("#app");
    container.textContent = text;
  });

  const DOMSource = Rx.Observable.fromEvent(document, 'click');
  return DOMSource;
}

function consoleLogDriver (msg$) {
  msg$.subscribe(msg => console.log(msg));
}

// bProxy = ...
// a = f(bProxy)
// b = g(a)
// bProxy.imitate(b)

// function run (mainFn, drivers) {
//   // const proxyDOMSource = new Rx.Subject();
//   // const sinks = mainFn(proxyDOMSource);
//   // const DOMSource = drivers.DOM(sinks.DOM);
//   // DOMSource.subscribe(click => proxyDOMSource.onNext(click));
//
//   const proxySources = {};
//   Object.keys(drivers).forEach(key => {
//     proxySources[key] = new Rx.Subject();
//   });
//   const sinks = mainFn(proxySources);
//   Object.keys(drivers).forEach(key => {
//     const source = drivers[key](sinks[key]);
//     source.subscribe(x => proxySources[key].onNext(x));
//   });
// }

const drivers = {
  DOM: DOMDriver,
  Log: consoleLogDriver
};

// run(main, drivers);
Cycle.run(main, drivers);
