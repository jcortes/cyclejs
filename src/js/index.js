/* global CLIENT */
import Rx from 'rx';
import { run } from '@cycle/core';
import { makeDOMDriver, makeHTMLDriver } from '@cycle/dom';
import { makeHTTPDriver } from '@cycle/http';
import { rerunner, restartable } from 'cycle-restart';

let main = require('./main').default;

export default () =>
	run(main, {
		DOM: makeHTMLDriver(),
		HTTP: makeHTTPDriver(),
		props$: () => Rx.Observable.of({
			label: 'Height',
			unit: 'cm',
			min: 140,
			max: 220,
			init: 170
		})
	});

if (CLIENT) {
	let drivers = {
		DOM: restartable(makeDOMDriver('#root'), { pauseSinksWhileReplaying: false }),
		HTTP: makeHTTPDriver(),
		props$: () => Rx.Observable.of({
			label: 'Height',
			unit: 'cm',
			min: 140,
			max: 220,
			init: 170
		})
	};

	let rerun = rerunner(run);
	rerun(main, drivers);

	if (module.hot) {
		require('webpack-hot-middleware/client');
		module.hot.accept(() => {
			main = require('./main').default;
			rerun(main, drivers);
		});
	}
}
