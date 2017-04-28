export function setFirebaseUser(state, user) {
    if (process.env.NODE_ENV !== "production" && typeof user === "object") {
        state.user = user;
    } else {
        throw TypeError("setFirebaseUser accepts only object. " + typeof user + " is set.");
    }
}