let intent = require('./main.intent').default;
let model = require('./main.model').default;
let view = require('./main.view').default;

export default ({ DOM, HTTP, props$ }) => {
	// DOM read effect: detect slider change
	const change$ = intent(DOM);
	// recalculate BMI
	const state$ = model(change$, props$);
	// DOM write effect: display BMI
	const vtree$ = view(state$);
	return {
		DOM: vtree$
	};
}
