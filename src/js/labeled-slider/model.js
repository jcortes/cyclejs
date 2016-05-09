import Rx from 'rx';

export default (newValue$, props$) => {
	const initialValue$ = props$.map(props => props.init).first();
	const value$ = initialValue$.concat(newValue$);
	return Rx.Observable.combineLatest(value$, props$, (value, props) => {
		return {
			label: props.label,
			unit: props.unit,
			max: props.max,
			min: props.min,
			value: value
		};
	});
}
