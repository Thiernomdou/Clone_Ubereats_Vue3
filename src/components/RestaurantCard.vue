<template>
  <div class="restaurant-card">
      <div class="restaurant-image" :style="changeBackground">
      </div>
      <div class="restaurant-informations">
          <div class="top">
                <p class="name">
                    {{ info_restaurant.name }}
                </p>
                <p class="note">
                  <span>
                     {{info_restaurant.note}}
                  </span>
                </p>
          </div>
          <p class="time">
             {{ info_restaurant.drive_time }}
          </p>
      </div>
  </div>
</template>

<script>
//import
import {computed} from 'vue'
export default {
    name: 'RestaurantCard',
    props: {
        info_restaurant: Object
    },
    setup(props) {
        //fonction qui va retourner background_image
        const changeBackground = computed(() => {
            return {
                backgroundImage: `url(${props.info_restaurant.image})`
            }
        })

        //return
        return {
            changeBackground
        }
    }
}
</script>

<style lang="scss" scoped>
.restaurant-card {
    width: 32%;
    height: 30vh;
    p {
        margin: 0px;
    }

    .restaurant-image {
        background-image: url("https://cn-geo1.uber.com/image-proc/resize/eats/format=webp/width=550/height=440/quality=70/srcb64=aHR0cHM6Ly9kMXJhbHNvZ25qbmczNy5jbG91ZGZyb250Lm5ldC8zNzg4MDJiMC1jNTI4LTQ4MjktYjBiNS0wY2M2NDBkZjYzY2QuanBlZw==");
        height: 70%;
        background-size: cover;
        background-position: center;
    }
    .restaurant-informations {
        .top {
            margin:10px 0px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .note{
                background-color: #eee;
                display:flex;
                align-items:center;
                justify-content:center;
                width:30px;
                height:30px;
                font-size: 0.8rem;
                border-radius: 50%;
            }
        }
        .time {
            font-size: 0.9rem;
        }
    }
}
</style>