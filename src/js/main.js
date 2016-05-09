import Rx from 'rx';
import { div, input, label, h2 } from '@cycle/dom';
import { Input } from './helpers';

export default ({ DOM, HTTP }) => {
	// DOM read effect: detect slider change
	const changeWeight$ = DOM.select('.weight').events('input')
		.map(ev => ev.target.value);
	const changeHeight$ = DOM.select('.height').events('input')
		.map(ev => ev.target.value)

	// recalculate BMI
	const state$ = Rx.Observable.combineLatest(
		changeWeight$.startWith(70),
		changeHeight$.startWith(170),
		(weight, height) => {
			const heightMeters = height * 0.01;
			const bmi = Math.round(weight / (heightMeters * heightMeters));
			return {bmi, weight, height};
		}
	)

	// DOM write effect: display BMI
	return {
		DOM: state$.map(state =>
			div([
				div([
					label('Weight: ' + state.weight + 'kg'),
					input('.weight', {type: 'range', min: 40, max: 150, value: state.weight})
				]),
				div([
					label('Height: ' + state.height + 'cm'),
					input('.height', {type: 'range', min: 140, max: 220, value: state.height})
				]),
				h2('BMI is ' + state.bmi)
			])
		)
	};
}
