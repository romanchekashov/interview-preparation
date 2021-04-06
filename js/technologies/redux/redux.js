/**
 * https://redux.js.org/recipes/writing-tests
 *
 */

const INCREMENT = 'INCREMENT'; // Define a constant for increment action types
const DECREMENT = 'DECREMENT'; // Define a constant for decrement action types
// Define the counter reducer which will increment or decrement the state based on the action it receives
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
const incAction = () => ({ type: INCREMENT }); // Define an action creator for incrementing
const decAction = () => ({ type: DECREMENT }); // Define an action creator for decrementing
const store = Redux.createStore(counterReducer); // Define the Redux store here, passing in your reducers
