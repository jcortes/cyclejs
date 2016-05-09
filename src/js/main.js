// import Rx from 'rx';
// import { div, input, label, h2 } from '@cycle/dom';
// import { Input } from './helpers';

let intent = require('./main.intent').default;
let model = require('./main.model').default;
let view = require('./main.view').default;

export default ({ DOM }) => {
	// DOM read effect: detect slider change
	const {changeWeight$, changeHeight$} = intent(DOM);
	// recalculate BMI
	const state$ = model(changeWeight$, changeHeight$);
	// DOM write effect: display BMI
	const vtree$ = view(state$);
	return {
		DOM: vtree$
	};
}
