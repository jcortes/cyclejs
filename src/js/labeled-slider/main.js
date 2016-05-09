import isolate from '@cycle/isolate';

let intent = require('./intent').default;
let model = require('./model').default;
let view = require('./view').default;

export default ({ DOM, props }) => {
	// DOM read effect: detect slider change
	const change$ = intent(DOM);
	// recalculate BMI
	const state$ = model(change$, props);
	// DOM write effect: display BMI
	const vtree$ = view(state$);
	return {
		DOM: vtree$,
    value: state$.map(state => state.value)
	};
}

// export default ({ DOM, props }) => {
// 	return isolate(LabeledSlider)({ DOM, props });
// }
