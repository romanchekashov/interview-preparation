export function userFetchFailed(e) {
    return { type: 'USER_FETCH_FAILED', message: e.message };
}

export function userFetchSucceeded(user) {
    return { type: 'USER_FETCH_SUCCEEDED', user };
}
