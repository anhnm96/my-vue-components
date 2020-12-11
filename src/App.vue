<template>
  <div id="nav">
    <router-link to="/">Home</router-link>|
    <router-link to="/table">Table</router-link>|
    <router-link to="/toggle">Toggle</router-link>|
    <router-link to="/skeleton">Skeleton</router-link>|
    <router-link to="/menu">Menu</router-link>|
    <router-link to="/transition">Transition</router-link>
  </div>
  <router-view />
</template>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

.scale-enter-active {
  @apply transform transition-all duration-75 ease-out;
}
.scale-leave-active {
  @apply transform transition-all duration-75 ease-out;
}
.scale-enter-from,
.scale-leave-to {
  @apply opacity-0 scale-75;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
