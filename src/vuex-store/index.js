import modules from "./modules";
//import * as getters from "./getters";
import * as actions from "./actions";
import * as mutations from "./mutations";


export default {
    state: {
        documentTitle: ""
    },
//    getters,
    mutations,
    actions,
    modules,
    plugins: [
        store => {
            store.dispatch("firebaseInitialize", {
                apiKey: process.env.FB_APIKEY,
                authDomain: process.env.FB_AUTHDOMAIN,
                databaseURL: process.env.FB_DATABASEURL,
                projectId: process.env.FB_PROJECTID,
                storageBucket: process.env.FB_STORAGEBUCKET,
                messagingSenderId: process.env.FB_MESSAGINGSENDERID
            });
        }
    ]
};
