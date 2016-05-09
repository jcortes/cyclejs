import Rx from 'rx';

let LabeledSlider = require('./labeled-slider/main').default;

export default ({ DOM, HTTP }) => {
	const props$ = Rx.Observable.of({
		label: 'Height',
		unit: 'cm',
		min: 140,
		max: 220,
		init: 170
	});
	return LabeledSlider({ DOM, HTTP, props$ });
}
