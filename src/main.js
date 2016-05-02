import {Rx} from 'rx';
import Cycle from '@cycle/core';
import CycleDOM from '@cycle/dom';

const {input, label, hr, div, h1, makeDOMDriver} = CycleDOM;

// Logic (functional)
function main (sources) {
  const inputEv$ = sources.DOM.select('.field').events('input');
  const name$ = inputEv$.map(ev => ev.target.value).startWith('');
  return {
    DOM: name$.map(name =>
      div([
        label('Name: '),
        input('.field', {type: 'text'}),
        hr(),
        h1('', `Hola ${name}!`)
      ])
    )
  }
}

const drivers = {
  DOM: makeDOMDriver('#app')
};

Cycle.run(main, drivers);
