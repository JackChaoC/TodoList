<template>
  <div class="first-router">
    <router-view></router-view>
  </div>
</template>

<script setup>
</script>

<style>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.first-router {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;

  * {
    padding: 0%;
    margin: 0%;
  }
}
</style>
