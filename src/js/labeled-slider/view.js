import { div, input, label, h2 } from '@cycle/dom';

export default (state$) => {
	return state$.map(state =>
		div('.labeled-slider', [
			label('.label', `${state.label}: ${state.value}${state.unit}`),
			input('.slider', {type: 'range', min: state.min, max: state.max, value: state.value})
		]),
	);
}
