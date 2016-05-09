import { div, input, label, h2 } from '@cycle/dom';

export default (state$) => {
	return state$.map(state =>
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
	);
}
