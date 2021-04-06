import 'cross-fetch/polyfill';

const url = (subUrl) => 'http://example.com/' + subUrl;

export const fetchPost = () => fetch(url('post'));

export const fetchUser = (userId) => {
    console.log('userId = ', userId);
    return fetch(url('user'));
};
