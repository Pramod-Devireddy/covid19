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
  data: {
    app1Hits: "",
    app2Hits: "",
    totalHits: "1000"
  },
  components: {
    india: india,
    covirus: covirus
  },
  created: function() {
    // this.updateHits();

    // setInterval(this.updateHits, 10000);

    // setTimeout(this.updateTempHits(), 30000);
  },
  methods: {
    updateHits: function() {
      var vm = this;

      var app1 = "https://covid-19ind.herokuapp.com/";
      var app2 = "https://pramod-devireddy.github.io/covid19";

      var query1 = "?url=" + encodeURIComponent(app1);
      var query2 = "?url=" + encodeURIComponent(app2);

      axios
        .get("https://hitcounter.pythonanywhere.com/nocount" + query1)
        .then(function(response) {
          vm.app1Hits = response.data;

          axios
            .get("https://hitcounter.pythonanywhere.com/nocount" + query2)
            .then(function(response) {
              vm.app2Hits = response.data;

              vm.totalHits = vm.app1Hits + vm.app2Hits;
            })
            .catch(function(error) {
              console.log(error);
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    updateTempHits: function() {
      window.location.reload(true);
    }
  }
});
