/*
 * File         : covirus.vue
 * Project      : COVID-19
 * Created Date : Monday, Mar 24th 2020, 12:48:08 AM
 * Author       : Pramod Devireddy
 * 
 * Last Modified: Tuesday, 3rd November 2020 2:09:19 am
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
            },
        },
    };
</script>

<style scoped>
    .particles {
        position: absolute;
        height: 100%;
        width: 100%;
    }
</style>
