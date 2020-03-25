/*
 * File         : covirus.vue
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
  <div class="particles">
    <div id="covirus" style="height: 100%; width: 100%"></div>
  </div>
</template>

<script>
module.exports = {
  name: "covirus",
  mounted() {
    this.initParticles();
  },
  methods: {
    initParticles() {
      particlesJS.load("covirus", "assets/corona.json");
    }
  }
};
</script>

<style scoped>
.particles {
    position: absolute;
    height: 100% ;
    width: 100%;
}
</style>
