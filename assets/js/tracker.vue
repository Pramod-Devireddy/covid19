<template>
  <div align="center" class="track">
    You are
    <span
      v-if="distance > 0"
      class="blinker"
      style="background-color: #00000055; border-radius: 3px; padding: 5px; color: #F00; font-size: 1rem; font-weight: bold;"
    >{{distance}} KM</span> away from nearest confirmed case
  </div>
</template>

<script>
module.exports = {
  name: "tracker",
  data() {
    return {
      latitude: 0,
      longitude: 0,
      distance: 0
    };
  },
  mounted() {
    this.updatePosition();
    setInterval(this.updatePosition, 20000);
  },
  methods: {
    updatePosition: function() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          this.currentPosition,
          function() {
            alert("Please Enable Location Services(GPS)");
          }
        );
      } else {
        console.log("Geo-Location is not supported by your browser");
      }
    },
    currentPosition: function(position) {
      var vm = this;

      vm.latitude = position.coords.latitude;
      vm.longitude = position.coords.longitude;

      var apiURL =
        "https://script.google.com/macros/s/AKfycbwqcrVhD9D6Oi2aIi9EG16ks3hLjbJqag_jznwxqpY88xdoBQun/exec?" +
        "lat=" +
        vm.latitude +
        "&" +
        "long=" +
        vm.longitude;

      axios
        .get(apiURL)
        .then(function(response) {
          vm.distance = parseFloat(response.data).toFixed(2);
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.track {
  margin: 0 auto;
  margin-top: 45px;
  margin-bottom: 5px;
  color: rgba(240, 255, 255, 0.884);
  font-size: 0.85rem;
}

@keyframes blinking {
  from {
    opacity: 1;
  }
  75% {
    opacity: 0.8;
  }
  to {
    opacity: 0;
  }
}

.blinker {
  animation-name: blinking;
  animation-duration: 0.6s;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
  animation-direction: alternate;
}
</style>
