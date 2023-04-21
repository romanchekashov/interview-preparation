// auth should return Promise
function auth() {
    asyncAuth((error, data) => {

    });
}
// answer
function auth() {
    return new Promise((resolve, reject) => {
        asyncAuth((error, data) => {
            if (error) {
                reject(error);
            } else {
                resolve(data);
            }
        });
    });
}

// should try auth() n times then throw error
async function tryAuth(n) {
    try {
        return await auth();
    } catch (error) {
        if (n > 0) {
            return await tryAuth(n - 1);
        } else {
            throw error;
        }
    }
}
