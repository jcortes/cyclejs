import Rx from 'rx';
import { div } from '@cycle/dom';
import isolate from '@cycle/isolate';

let LabeledSlider = require('./labeled-slider/main').default;

let IsolatedLabeledSlider = ({ DOM, props }) => {
	return isolate(LabeledSlider)({ DOM, props });
}

export default ({ DOM }) => {
	const weightProps$ = Rx.Observable.of({
		label: 'Weight',
		unit: 'kg',
		min: 40,
		max: 150,
		init: 70
	});
	const weightSinks = IsolatedLabeledSlider({
		DOM, props: weightProps$
	});
	const weightVTree$ = weightSinks.DOM;

	const heightProps$ = Rx.Observable.of({
		label: 'Height',
		unit: 'cm',
		min: 140,
		max: 220,
		init: 170
	});
	const heightSinks = IsolatedLabeledSlider({
		DOM, props: heightProps$
	});
	const heightVTree$ = heightSinks.DOM;

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
