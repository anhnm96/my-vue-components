<template>
  <div id="nav">
    <router-link to="/">Home</router-link>|
    <router-link to="/table">Table</router-link>
    <router-link to="/transition">Transition</router-link>
  </div>
  <router-view />
</template>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
</style>
