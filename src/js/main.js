import Rx from 'rx';
import { div, h2 } from '@cycle/dom';
import isolate from '@cycle/isolate';

let LabeledSlider = require('./labeled-slider/main').default;

let IsolatedLabeledSlider = ({ DOM, props }) => {
	return isolate(LabeledSlider)({ DOM, props });
}

// let IsolatedLabeledSlider = require('./labeled-slider/main').default;

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
	const weightValue$ = weightSinks.value;

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
	const heightValue$ = heightSinks.value;

	const bmi$ = Rx.Observable.combineLatest(weightValue$, heightValue$, (weight, height) => {
		const heightMeters = height * 0.01;
		const bmi = Math.round(weight / (heightMeters * heightMeters));
		return bmi;
	});

	const vtree$ = Rx.Observable.combineLatest(
		bmi$,
		weightVTree$,
		heightVTree$,
		(bmi, weightVTree, heightVTree) =>
			div([
				weightVTree,
				heightVTree,
				h2('BMI is ' + bmi)
			])
	);

	return {
		DOM: vtree$
	};
}
