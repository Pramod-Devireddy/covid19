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
    <svg
      id="india"
      :width="svgWidth"
      :height="svgHeight"
      :viewBox="`{0 0 ${svgWidth} ${svgHeight}}`"
      preserveAspectRatio="xMidYMid meet"
    />
</template>

<script>
module.exports = {
  name: "india",
  data() {
    return {
      svgWidth: window.innerWidth <= 750 ? 600 : 615,
      svgHeight: window.innerWidth <= 750 ? 550 : 700
    };
  },
  mounted() {
    
    var svg = d3.select("#india");

    const width = +svg.attr("width");
    const height = +svg.attr("height");

    const promises = [d3.json("assets/india.json")];

    Promise.all(promises).then(ready);

    function ready([india]) {
        var projection
      if (window.innerWidth < 700) {

        projection = d3
          .geoMercator()
          .center([93, 19])
          .scale(650)
          .translate([width / 2, height / 2]);

      } else {

        projection = d3
          .geoMercator()
          .center([83, 23.5])
          .scale(1200)
          .translate([width / 2, height / 2]);
      }

      var path = d3.geoPath(projection);

      var states = topojson.feature(india, india.objects.india);

      svg
        .append("g")
        .attr("class", "states")
        .attr("stroke", "#ff073a2a")
        .selectAll("path")
        .data(topojson.feature(india, india.objects.india).features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("pointer-events", "all")
        .on("mouseenter", d => {
          const target = d3.event.target;
          d3.select(target.parentNode.appendChild(target))
            .attr("fill", "#111")
            .attr("stroke", "#ff073a")
            .attr("stroke-width", 2);
        })
        .on("mouseleave", d => {
          const target = d3.event.target;
          d3.select(target)
            .attr("fill", "#000")
            .attr("stroke", "#ff073a2a");
        })
        .style("cursor", "pointer")
        .append("title")
        .text(function(d) {
          return d.properties.ST_NM;
        });

      svg
        .append("path")
        .attr("stroke", "#ff073a2a")
        .attr("fill", "none")
        .attr("stroke-width", 2)
        .attr("d", path(topojson.mesh(india, india.objects.india)));
    }
  },
  methods: {}
};
</script>

<style scoped>
.svg-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
svg {
  align-self: center;
}
</style>
