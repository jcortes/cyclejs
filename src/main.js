import {Rx} from 'rx';

// Logic (functional)
function main () {
  return {
    DOM: Rx.Observable.timer(0, 1000)
      .map((i) => `Seconds elapsed ${i}`),
    Log: Rx.Observable.timer(0, 2000)
      .map(i => i * 2)
  }
}

// Effects (imperative)
function DOMEffects (text$) {
  text$.subscribe(text => {
    const container = document.querySelector("#app");
    container.textContent = text;
  });
}

function consoleLogEffect (msg$) {
  msg$.subscribe(msg => console.log(msg));
}

const sinks = main();
DOMEffects(sinks.DOM);
consoleLogEffect(sinks.Log);
