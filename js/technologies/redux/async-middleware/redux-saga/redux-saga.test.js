import { runSaga } from 'redux-saga';
import * as api from '../../../api';

import { userFetchFailed, userFetchSucceeded } from '../../actions';

import { fetchUser } from './redux-saga';

describe('fetchUser', () => {
    it('should call api and dispatch success action', async () => {
        const dummyUser = { name: 'JK Rowling' };
        const fetchUserRequest = jest
            .spyOn(api, 'fetchUser')
            .mockImplementation(() => Promise.resolve(dummyUser));
        const dispatched = [];
        const result = await runSaga(
            {
                dispatch: (action) => dispatched.push(action),
            },
            fetchUser,
            { userId: 1 }
        );

        expect(fetchUserRequest).toHaveBeenCalledTimes(1);
        expect(dispatched).toEqual([userFetchSucceeded(dummyUser)]);
        fetchUserRequest.mockClear();
    });

    // it('should call api and dispatch error action', async () => {
    //     const requestAuthors = jest
    //         .spyOn(api, 'requestAuthors')
    //         .mockImplementation(() => Promise.reject());
    //     const dispatched = [];
    //     const result = await runSaga(
    //         {
    //             dispatch: (action) => dispatched.push(action),
    //         },
    //         makeAuthorsApiRequest
    //     );

    //     expect(requestAuthors).toHaveBeenCalledTimes(1);
    //     expect(dispatched).toEqual([saveAuthorsToListError()]);
    //     requestAuthors.mockClear();
    // });
});
