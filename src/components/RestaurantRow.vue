<template>
  <div class="restaurant-row">
        <h2 class="title">
            Nos restaurant
        </h2>
        <div class="wrapper-card">
            <RestaurantCard v-for="(card, index) in three_restaurant" :key="index" :info_restaurant="card"/>
        </div>
  </div>
</template>

<script>
import RestaurantCard from '@/components/RestaurantCard'
export default {
    name: 'RestaurantRow',
    components: {
        RestaurantCard
    },
    props: {
        three_restaurant: Array
    }
}
</script>

<style lang="scss" scoped>
.restaurant-row {
    .title {
        font-size: 2rem;
    } 
    .wrapper-card {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
}
</style>