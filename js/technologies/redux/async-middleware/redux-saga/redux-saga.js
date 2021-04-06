import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import * as api from '../../../api';
import * as actions from '../../actions';

/**
redux-saga is a library that aims to make application side effects (i.e. asynchronous things like data fetching and 
impure things like accessing the browser cache) easier to manage, more efficient to execute, easy to test, and 
better at handling failures.

The mental model is that a saga is like a separate thread in your application that's solely responsible for side 
effects. redux-saga is a redux middleware, which means this thread can be started, paused and cancelled from 
the main application with normal redux actions, it has access to the full redux application state and it can dispatch 
redux actions as well.

It uses an ES6 feature called Generators to make those asynchronous flows easy to read, write and test. (if you're 
not familiar with them here are some introductory links) By doing so, these asynchronous flows look like your 
standard synchronous JavaScript code. (kind of like async/await, but generators have a few more awesome features we need)

You might've used redux-thunk before to handle your data fetching. Contrary to redux thunk, you don't end up in 
callback hell, you can test your asynchronous flows easily and your actions stay pure.

npm install redux-saga

 */

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
export function* fetchUser(action) {
    try {
        console.log('action = ', action);
        const user = yield call(api.fetchUser, action.userId);
        yield put(actions.userFetchSucceeded(user));
    } catch (e) {
        yield put(actions.userFetchFailed(e));
    }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
export function* mySaga_takeEvery() {
    yield takeEvery('USER_FETCH_REQUESTED', fetchUser);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
export function* mySaga_takeLatest() {
    yield takeLatest('USER_FETCH_REQUESTED', fetchUser);
}
