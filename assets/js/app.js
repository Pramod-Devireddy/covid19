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
const india = httpVueLoader("assets/js/india.vue");
const covirus = httpVueLoader("assets/js/covirus.vue");

new Vue({
  el: "#app",
  vuetify: new Vuetify(),
  data: {},
  components: {
    india: india,
    covirus: covirus
  },
  created: function() {},
  methods: {}
});
