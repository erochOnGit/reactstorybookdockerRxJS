import React from "react";
import classnames from "classnames";
import rxjsConfig from "recompose/rxjsObservableConfig";
// import { Rx } from "rxjs/Rx/";
import { Observable } from "rxjs";
// import mapTo from "rxjs/add/operator/mapTo";
import {
  componentFromStream,
  createEventHandler,
  compose,
  mapProps,
  withState
} from "recompose";
import { setObservableConfig } from "recompose";

setObservableConfig({
  // Converts a plain ES observable to an RxJS 5 observable
  fromESObservable: Observable.from
});

const Counter = componentFromStream(props$ => {
  const { handler: increment, stream: increment$ } = createEventHandler();
  const { handler: decrement, stream: decrement$ } = createEventHandler();

  const count$ = Observable.merge(increment$.mapTo(1), decrement$.mapTo(-1))
    .startWith(0)
    .scan((count, n) => count + n, 0);

  return props$.combineLatest(count$, (props, count) => (
    <div {...props}>
      Counxcvt: {count}
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
    </div>
  ));
});
export default Counter;
