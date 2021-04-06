import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as api from '../../../api';

const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
    switch (action.type) {
        case INCREMENT:
            return state + 1;
        case DECREMENT:
            return state - 1;
        default:
            return state;
    }
};

/**
 * Thunk middleware for Redux.
 *
 * With a plain basic Redux store, you can only do simple synchronous updates by dispatching an action.
 * Middleware extends the store's abilities, and lets you write async logic that interacts with the store.
 *
 * Thunks are the recommended middleware for basic Redux side effects logic, including complex synchronous
 * logic that needs access to the store, and simple async logic like AJAX requests.
 *
 */

export function sum(a, b) {
    return a + b;
}
export const FETCH_TODOS_REQUEST = 'FETCH_TODOS_REQUEST';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAILURE = 'FETCH_TODOS_FAILURE';

function fetchTodosRequest() {
    return {
        type: FETCH_TODOS_REQUEST,
    };
}

function fetchTodosSuccess(body) {
    return {
        type: FETCH_TODOS_SUCCESS,
        body,
    };
}

function fetchTodosFailure(ex) {
    return {
        type: FETCH_TODOS_FAILURE,
        ex,
    };
}

export function fetchTodos() {
    return (dispatch) => {
        dispatch(fetchTodosRequest());
        return fetch('http://example.com/todos')
            .then((res) => res.json())
            .then((body) => dispatch(fetchTodosSuccess(body)))
            .catch((ex) => dispatch(fetchTodosFailure(ex)));
    };
}

/**
 * Redux Thunk middleware allows you to write action creators that return a function instead of an action.
 * The thunk can be used to delay the dispatch of an action, or to dispatch only if a certain condition is met.
 * The inner function receives the store methods dispatch and getState as parameters.
 */

/**
 * An action creator that returns a function to perform asynchronous dispatch:
 */
const INCREMENT_COUNTER = 'INCREMENT_COUNTER';

function increment() {
    return {
        type: INCREMENT_COUNTER,
    };
}

function incrementAsync() {
    return (dispatch) => {
        setTimeout(() => {
            // Yay! Can invoke sync or async actions with `dispatch`
            dispatch(increment());
        }, 1000);
    };
}

/**
 * An action creator that returns a function to perform conditional dispatch:
 */
function incrementIfOdd() {
    return (dispatch, getState) => {
        const { counter } = getState();

        if (counter % 2 === 0) {
            return;
        }

        dispatch(increment());
    };
}

/**
 * A thunk is a function that wraps an expression to delay its evaluation.
 */
// calculation of 1 + 2 is immediate
// x === 3
let x = 1 + 2;

// calculation of 1 + 2 is delayed
// foo can be called later to perform the calculation
// foo is a thunk!
let foo = () => 1 + 2;

/**
 * Installation
 *
 * npm install redux-thunk
 *
 * Then, to enable Redux Thunk, use applyMiddleware():
 */

/**
 * Composition
 * Any return value from the inner function will be available as the return value of dispatch itself.
 * This is convenient for orchestrating an asynchronous control flow with thunk action creators
 * dispatching each other and returning Promises to wait for each other’s completion:
 */

const store = createStore(counterReducer, applyMiddleware(thunk));

// You can define asynchronous action creators that return functions.
// We call such action creators "thunks":

export function getUser(id) {
    // Redux Thunk will inject dispatch here:
    return (dispatch) => {
        // Reducers may handle this to set a flag like isFetching
        dispatch({ type: 'GET_USER_REQUEST', id });

        // Perform the actual API call
        return api.fetchUser().then(
            (response) => {
                // Reducers may handle this to show the data and reset isFetching
                dispatch({ type: 'GET_USER_SUCCESS', id, response });
            },
            (error) => {
                // Reducers may handle this to reset isFetching
                dispatch({ type: 'GET_USER_FAILURE', id, error });
                // Rethrow so returned Promise is rejected
                throw error;
            }
        );
    };
}

// Thunks can be dispatched, if Redux Thunk is applied,
// just like normal action creators:
store.dispatch(getUser(42));

// The return value of dispatch() when you dispatch a thunk *is*
// the return value of the inner function. This is why it's useful
// to return a Promise (even though it is not strictly necessary):
store
    .dispatch(getUser(42))
    .then(() => console.log('Fetched user and updated UI!'))
    .catch(console.error);

// Here is another thunk action creator.
// It works exactly the same way.
export function getPost(id) {
    return (dispatch) => {
        dispatch({ type: 'GET_POST_REQUEST', id });
        return fetchPost().then(
            (response) => dispatch({ type: 'GET_POST_SUCCESS', id, response }),
            (error) => {
                dispatch({ type: 'GET_POST_FAILURE', id, error });
                throw error;
            }
        );
    };
}

// Now we can combine them
export function getUserAndTheirFirstPost(userId) {
    // Again, Redux Thunk will inject dispatch here.
    // It also injects a second argument called getState() that lets us read the current state.
    return (dispatch, getState) => {
        // Remember I told you dispatch() can now handle thunks?
        return dispatch(getUser(userId)).then(() => {
            // Assuming this is where the fetched user got stored
            const fetchedUser = getState().usersById[userId];
            // Assuming it has a "postIDs" field:
            const firstPostID = fetchedUser.postIDs[0];
            // And we can dispatch() another thunk now!
            return dispatch(getPost(firstPostID));
        });
    };
}

// And we can now wait for the combined thunk:
store.dispatch(getUserAndTheirFirstPost(43)).then(() => {
    console.log('fetched a user and their first post');
});

// We can do this anywhere we have access to dispatch().
// For example, we can use this.props.dispatch, or put action
// creators right into the props by passing them to connect, like this:
// export default connect(mapStateToProps, { getUserAndTheirFirstPost })

/**
 * Injecting a Custom Argument
 * Since 2.1.0, Redux Thunk supports injecting a custom argument using the withExtraArgument function:
 *
 * To pass multiple things, just wrap them in a single object.
 * Using ES2015 shorthand property names can make this more concise.
 */
const apiUrl = 'http://www.example.com/sandwiches/';
const whatever = 42;

const store1 = createStore(
    counterReducer,
    applyMiddleware(thunk.withExtraArgument({ apiUrl, whatever }))
);

// later
function fetchSandwich(id) {
    return (dispatch, getState, { apiUrl, whatever }) => {
        // you can use api and something else here
    };
}
