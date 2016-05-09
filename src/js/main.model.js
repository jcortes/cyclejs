import Rx from 'rx';

export default (changeWeight$, changeHeight$) => {
	return Rx.Observable.combineLatest(
		changeWeight$.startWith(70),
		changeHeight$.startWith(170),
		(weight, height) => {
			const heightMeters = height * 0.01;
			const bmi = Math.round(weight / (heightMeters * heightMeters));
			return {bmi, weight, height};
		}
	);
}
