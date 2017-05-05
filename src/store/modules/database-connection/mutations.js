export function setFirebaseUser(state, user) {
    if (process.env.NODE_ENV === "production" || typeof user === "object") {
        state.user = user;
    } else {
        throw TypeError("setFirebaseUser accepts only object. " + typeof user + " is set.");
    }
};

export function setFirebaseAppname(state, appname) {
    if (process.env.NODE_ENV === "production" || typeof appname === "string" || appname === false) {
        state.appname = appname;
    } else {
        throw TypeError("setFirebaseAppname accepts only string or false. " + (appname === true || typeof appname) + " is set.");
    }
};
