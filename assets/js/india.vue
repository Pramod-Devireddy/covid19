/*
 * File         : india.vue
 * Project      : COVID-19
 * Created Date : Monday, Mar 24th 2020, 12:48:08 AM
 * Author       : Pramod Devireddy
 * 
 * Last Modified: Wednesday, Mar 25th 2020, 9:50:05 PM
 * Modified By  : Pramod Devireddy
 * 
 * Copyright (c)2020 - Pramod Devireddy
 */

<template>
  <div style="margin: 0 auto">
    <p style="margin-bottom: 15px;">
      <span
        class="tiny itemText"
        style="font-weight: bold; background-color: #110101; border-radius: 3px; padding: 5px; margin-bottom: 15px;"
      >All INDIA CASES</span>
      <br />
      <span class="itemText" style="background-color: #AD6613; border-radius: 3px; padding: 5px;">
        ACTIVE:&nbsp;
        <span class="itemText" style="font-weight: bold;">{{totalActive}}</span>
        <span class="itemText">[&#8593;{{totalDeltaActive}}]</span>
        <span class="tiny itemText">/{{totalConfirmed}}</span>
      </span>

      <span class="itemText" style="background-color: #9C2929; border-radius: 3px; padding: 5px;">
        DEATHS:&nbsp;
        <span class="itemText" style="font-weight: bold;">{{totalDeaths}}</span>
        <span class="itemText">[&#8593;{{totalDeltaDeaths}}]</span>
        <!-- <span class="tiny itemText">({{mortalityRate}})</span> -->
      </span>

      <span class="itemText" style="background-color: #197A12; border-radius: 3px; padding: 5px;">
        RECOVERIES:&nbsp;
        <span class="itemText" style="font-weight: bold;">{{totalRecovered}}</span>
        <span class="itemText">[&#8593;{{totalDeltaRecovered}}]</span>
        <!-- <span class="tiny itemText">({{recoveryRate}})</span> -->
      </span>
    </p>
    <svg id="india" />
    <p>
      <span
        class="tiny itemText"
        style="font-weight: bold; background-color: #110101; border-radius: 3px; padding: 5px; text-transform: uppercase;"
      >{{selectedState}} Cases</span>
      <br />
      <span class="itemText" style="background-color: #AD6613; border-radius: 3px; padding: 5px;">
        ACTIVE:&nbsp;
        <span class="itemText" style="font-weight: bold;">{{selStateActive}}</span>
        <span class="itemText">[&#8593;{{selStateDeltaActive}}]</span>
        <span class="tiny itemText">/{{selStateConfirmed}}</span>
      </span>
      <span class="itemText" style="background-color: #9C2929; border-radius: 3px; padding: 5px;">
        DEATHS:&nbsp;
        <span class="itemText" style="font-weight: bold;">{{selStateDeaths}}</span>
        <span class="itemText">[&#8593;{{selStateDeltaDeaths}}]</span>
        <!-- <span class="tiny itemText">({{selStateMortalityRate}})</span> -->
      </span>
      <span class="itemText" style="background-color: #197A12; border-radius: 3px; padding: 5px;">
        RECOVERIES:&nbsp;
        <span class="itemText" style="font-weight: bold;">{{selStateRecovered}}</span>
        <span class="itemText">[&#8593;{{selStateDeltaRecovered}}]</span>
        <!-- <span class="tiny itemText">({{selStateRecoveryRate}})</span> -->
      </span>
    </p>
  </div>
</template>

<script>
module.exports = {
  name: "india",
  data() {
    return {
      totalData: [],

      totalActive: "",
      totalDeltaActive: "",
      totalConfirmed: "",

      totalDeaths: "",
      totalDeltaDeaths: "",
      mortalityRate: "",

      totalRecovered: "",
      totalDeltaRecovered: "",
      recoveryRate: "",

      selectedState: "Andhra Pradesh",

      selStateActive: "",
      selStateDeltaActive: "",
      selStateConfirmed: "",

      selStateDeaths: "",
      selStateDeltaDeaths: "",
      selStateMortalityRate: "",

      selStateRecovered: "",
      selStateDeltaRecovered: "",
      selStateRecoveryRate: ""
    };
  },
  mounted() {
    this.renderIndiaMap();
    this.updateTotalData();
    setInterval(this.updateTotalData, 60000); //Real-Time Stats
    window.addEventListener("resize", this.renderIndiaMap);
  },
  methods: {
    renderIndiaMap: function() {
      var vm = this;

      var initWidth = window.innerWidth - 20;
      var initHeight = window.innerHeight - 20;

      if (initWidth > initHeight) {
        initWidth = initHeight - 210; // Trial & Error
      }

      var svg = d3
        .select("#india")
        .attr("width", initWidth)
        .attr("height", initHeight);

      const promises = [d3.json("assets/india.json")];

      Promise.all(promises).then(ready);

      function ready([india]) {
        var states = topojson.feature(india, india.objects.india);

        var projection = d3
          .geoIdentity()
          .reflectY(true)
          .fitSize([initWidth, initHeight], states);

        var path = d3.geoPath(projection);

        d3.select("#states").remove();
        svg
          .append("g")
          .attr("id", "states")
          .selectAll("path")
          .data(states.features)
          .enter()
          .append("path")
          .attr("d", path);

        var width = document.getElementById("states").getBBox().width;
        var height = document.getElementById("states").getBBox().height;

        svg.attr("width", width);
        svg.attr("height", height);

        projection = d3
          .geoIdentity()
          .reflectY(true)
          .fitSize([width, height], states);

        path = d3.geoPath(projection);

        d3.select("#states").remove();
        svg
          .append("g")
          .attr("id", "states")
          .attr("stroke", "#ff073a5a")
          .attr("stroke-width", 1.5)
          .selectAll("path")
          .data(states.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("pointer-events", "all")
          .on("mouseenter", d => {
            const target = d3.event.target;
            d3.select(target)
              .attr("fill", "#181818")
              .attr("stroke", "#ff073a")
              .attr("stroke-width", 2);
            vm.selectedState = d.properties.ST_NM;
            vm.updateStateData();
          })
          .on("mouseleave", d => {
            const target = d3.event.target;
            d3.select(target)
              .attr("fill", "#000")
              .attr("stroke", "#ff073a5a")
              .attr("stroke-width", 1.5);
          })
          .style("cursor", "pointer")
          .append("title")
          .text(function(d) {
            return d.properties.ST_NM;
          });

      }
    },

    updateTotalData: function() {
      var vm = this;
      axios
        .get("https://api.covid19india.org/data.json")
        .then(function(response) {
          vm.totalData = response.data;

          for (var i = 0; i < vm.totalData.statewise.length; i++) {
            if (vm.totalData.statewise[i].state == "Total") {
              vm.totalActive = vm.totalData.statewise[i].active;
              vm.totalDeltaActive = vm.totalData.statewise[i].delta.active;
              vm.totalConfirmed = vm.totalData.statewise[i].confirmed;

              vm.totalDeaths = vm.totalData.statewise[i].deaths;
              vm.totalDeltaDeaths = vm.totalData.statewise[i].delta.deaths;
              vm.mortalityRate =
                ((vm.totalDeaths / vm.totalConfirmed) * 100).toFixed(2) + "%";

              vm.totalRecovered = vm.totalData.statewise[i].recovered;
              vm.totalDeltaRecovered =
                vm.totalData.statewise[i].delta.recovered;
              vm.recoveryRate =
                ((vm.totalRecovered / vm.totalConfirmed) * 100).toFixed(2) +
                "%";

              break;
            }
          }

          vm.updateStateData();
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    updateStateData: function() {
      var vm = this;
      for (var i = 0; i < vm.totalData.statewise.length; i++) {
        if (vm.totalData.statewise[i].state == vm.selectedState) {
          vm.selStateActive = vm.totalData.statewise[i].active;
          vm.selStateDeltaActive = vm.totalData.statewise[i].delta.active;
          vm.selStateConfirmed = vm.totalData.statewise[i].confirmed;

          vm.selStateDeaths = vm.totalData.statewise[i].deaths;
          vm.selStateDeltaDeaths = vm.totalData.statewise[i].delta.deaths;
          vm.selStateMortalityRate =
            ((vm.selStateDeaths / vm.selStateConfirmed) * 100).toFixed(2) + "%";

          vm.selStateRecovered = vm.totalData.statewise[i].recovered;
          vm.selStateDeltaRecovered = vm.totalData.statewise[i].delta.recovered;
          vm.selStateRecoveryRate =
            ((vm.selStateRecovered / vm.selStateConfirmed) * 100).toFixed(2) +
            "%";

          break;
        }
      }
    }
  }
};
</script>

<style scoped>
p {
  margin: 0;
  color: aliceblue;
  font-size: 0.9rem;
}

.tiny {
  color: rgba(240, 255, 255, 0.692);
}
</style>
