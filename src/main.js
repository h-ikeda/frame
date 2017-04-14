import "./index.html";
import favicon from "./assets/favicon.ico";
import Vue from "vue";
import app from "./app.vue";
import store from "./store";

const link = document.createElement("link");
link.href = favicon;
link.rel = "icon";
document.querySelector("head").appendChild(link);

new Vue({
    el: "div",
    store,
    render: h => h(app)
});
