export default (DOM) => {
	const changeWeight$ = DOM.select('.weight').events('input')
		.map(ev => ev.target.value);
	const changeHeight$ = DOM.select('.height').events('input')
		.map(ev => ev.target.value);
	return {changeWeight$, changeHeight$};
}
