// import { Observable as $ } from 'rx';
import Rx from 'rx';
import { button, h1, h4, a, div } from '@cycle/dom';
import { Input } from './helpers';

export default ({ DOM, HTTP }) => {

	const clickEvent$ = DOM.select('.get-first').events('click');

  const request$ = clickEvent$.map(ev => {
    return {
      url: 'http://jsonplaceholder.typicode.com/users/1',
      method: 'GET'
    };
  });

  const response$$ = HTTP
    .filter(response$ =>
      response$.request.url === 'http://jsonplaceholder.typicode.com/users/1');

  const response$ = response$$.switch();

  const firstUser$ = response$
    .map(response => response.body)
    .startWith(undefined);

	return {
		DOM: firstUser$.map(firstUser =>
      div([
        button('.get-first', 'Get first user'),
        !firstUser ? undefined : div('.user-details', [
          h1('.user-name', firstUser.name),
          h4('.user-email', firstUser.email),
          a('.user-website', {href: firstUser.website}, firstUser.website)
        ])
      ])
    ),
		HTTP: request$
	};
}
