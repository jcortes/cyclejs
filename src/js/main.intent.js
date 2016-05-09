export default (DOM) => {
	return DOM.select('.slider').events('input')
		.map(ev => ev.target.value);
}
