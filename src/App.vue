<template>
  <div id="app">
    <RestaurantCard></RestaurantCard>
  </div>
</template>

<script>
import RestaurantCard from '@/components/RestaurantCard.vue'

export default {
  name: 'App',
  components: {
    RestaurantCard
  }
  
}
</script>

<style>
@import url('/style/rest.css');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@500&display=swap');
#app {
  font-family: 'Roboto, sans-serif';
}
</style>
