/*
 * File         : app.js
 * Project      : COVID-19
 * Created Date : Monday, Mar 23rd 2020, 10:48:08 AM
 * Author       : Pramod Devireddy
 *
 * Last Modified: Tuesday, 3rd November 2020 2:08:56 am
 * Modified By  : Pramod Devireddy
 *
 * Copyright (c)2020 - Pramod Devireddy
 */
const india = httpVueLoader("assets/js/india.vue");
const covirus = httpVueLoader("assets/js/covirus.vue");
const tracker = httpVueLoader("assets/js/tracker.vue");

new Vue({
    el: "#app",
    vuetify: new Vuetify(),
    data: {
        app1Hits: "",
        app2Hits: "",
        totalHits: "1000",
    },
    components: {
        india: india,
        covirus: covirus,
        tracker: tracker,
    },
    created: function () {},
    methods: {},
});
