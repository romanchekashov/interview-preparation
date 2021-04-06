/**

What async middleware should I use? How do you decide between thunks, sagas, observables, or something else?
There are many async/side effect middlewares available, but the most commonly used ones are 
redux-thunk, redux-saga, and redux-observable. These are different tools, with different strengths, weaknesses, and use cases.

As a general rule of thumb:

- Thunks are best for complex synchronous logic (especially code that needs access to the entire 
  Redux store state), and simple async logic (like basic AJAX calls). With the use of async/await, it 
  can be reasonable to use thunks for some more complex promise-based logic as well.

- Sagas are best for complex async logic and decoupled "background thread"-type behavior, 
  especially if you need to listen to dispatched actions (which is something that can't be done with 
  thunks). They require familiarity with ES6 generator functions and redux-saga's "effects" operators.

- Observables solve the same problems as sagas, but rely on RxJS to implement async behavior. They 
  require familiarity with the RxJS API.

We recommend that most Redux users should start with thunks, and then add an additional side effect 
library like sagas or observables later if their app really requires handling for more complex async logic.

Since sagas and observables have the same use case, an application would normally use one or the other, 
but not both. However, note that it's absolutely fine to use both thunks and either sagas or 
observables together, because they solve different problems.

 */
