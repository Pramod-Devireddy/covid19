/*
 * File         : app.js
 * Project      : COVID-19
 * Created Date : Monday, Mar 23rd 2020, 10:48:08 AM
 * Author       : Pramod Devireddy
 *
 * Last Modified: Wednesday, Mar 25th 2020, 9:57:59 PM
 * Modified By  : Pramod Devireddy
 *
 * Copyright (c)2020 - Pramod Devireddy
 */
const india = httpVueLoader("assets/js/india.vue?v=20");
const covirus = httpVueLoader("assets/js/covirus.vue");
const tracker = httpVueLoader("assets/js/tracker.vue");

new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: {
    app1Hits: "",
    app2Hits: "",
    totalHits: "1000"
  },
  components: {
    india: india,
    covirus: covirus,
    tracker: tracker
  },
  created: function() {
    
  },
  methods: {
    
  }
});
