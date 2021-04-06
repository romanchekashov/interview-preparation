import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import {
    sum,
    fetchTodos,
    FETCH_TODOS_REQUEST,
    FETCH_TODOS_SUCCESS,
} from './redux-thunk';

test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
    afterEach(() => {
        fetchMock.restore();
    });

    it('creates FETCH_TODOS_SUCCESS when fetching todos has been done', () => {
        fetchMock.getOnce('http://example.com/todos', {
            body: { todos: ['do something'] },
            headers: { 'content-type': 'application/json' },
        });

        const expectedActions = [
            { type: FETCH_TODOS_REQUEST },
            {
                type: FETCH_TODOS_SUCCESS,
                body: { todos: ['do something'] },
            },
        ];
        const store = mockStore({ todos: [] });

        return store.dispatch(fetchTodos()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
