import {Rx} from 'rx';
import Cycle from '@cycle/core';

function h (tagName, children) {
  return {
    tagName: tagName,
    children: children
  };
}

function h1 (children) {
  return {
    tagName: 'H1',
    children: children
  };
}

function span (children) {
  return {
    tagName: 'SPAN',
    children: children
  };
}

// Logic (functional)
function main (sources) {
  const click$ = sources.DOM.selectEvents('span', 'mouseover');
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
function DOMDriver (obj$) {
  function createElement (obj) {
    const element = document.createElement(obj.tagName);
    obj.children
      .filter(c => typeof c === 'object')
      .map(createElement)
      .forEach(c => element.appendChild(c));
    obj.children
      .filter(c => typeof c === 'string')
      .forEach(c => element.innerHTML += c);
    return element;
  }

  obj$.subscribe(obj => {
    const container = document.querySelector("#app");
    container.innerHTML = '';
    const element = createElement(obj);
    container.appendChild(element);
  });

  const DOMSource = {
    selectEvents: function (tagName, eventType) {
      return Rx.Observable.fromEvent(document, eventType)
        .filter(ev => ev.target.tagName === tagName.toUpperCase());
    }
  };
  return DOMSource;
}

function consoleLogDriver (msg$) {
  msg$.subscribe(msg => console.log(msg));
}

const drivers = {
  DOM: DOMDriver,
  Log: consoleLogDriver
};

Cycle.run(main, drivers);
