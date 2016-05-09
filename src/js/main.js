import Rx from 'rx';
import { div } from '@cycle/dom';

let LabeledSlider = require('./labeled-slider/main').default;

export default ({ DOM }) => {
	const weightProps$ = Rx.Observable.of({
		label: 'Weight',
		unit: 'kg',
		min: 40,
		max: 150,
		init: 70
	});
	const weightSinks = LabeledSlider({
		DOM: DOM.select('.weight'), props: weightProps$
	});
	const weightVTree$ = weightSinks.DOM.map(vtree => {
		vtree.properties.className += ' weight';
		return vtree;
	});

	const heightProps$ = Rx.Observable.of({
		label: 'Height',
		unit: 'cm',
		min: 140,
		max: 220,
		init: 170
	});
	const heightSinks = LabeledSlider({
		DOM: DOM.select('.height'), props: heightProps$
	});
	const heightVTree$ = heightSinks.DOM.map(vtree => {
		vtree.properties.className += ' height';
		return vtree;
	});

	const vtree$ = Rx.Observable.combineLatest(
		weightVTree$,
		heightVTree$,
		(weightVTree, heightVTree) =>
			div([
				weightVTree,
				heightVTree
			])
	);

	return {
		DOM: vtree$
	};
}
