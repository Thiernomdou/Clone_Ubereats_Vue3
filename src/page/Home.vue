<template>
  <div class="home">
        <div class="header">
            <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg" alt="logo_ubereats">
            <input type="text" placeholder="De quoi avez vos envie ?">
        </div>
        <div class="banniere">
        </div>
        <RestaurantRow v-for="(data, index) in data_restaurant" :key="index" :three_restaurant="data"/>
  </div>
</template>

<script>
//IMPORT
import BDD from '@/BDD'

//COMPONENTS
import RestaurantRow from '@/components/RestaurantRow'
import {onMounted, ref} from 'vue'
export default {
    name: 'Home',
    components: {
        RestaurantRow
    },
    //créer un setup de gestion d javascrit
    //déclaration de fonctions pour 
    //accéder aux data
    setup() {
        //créer une classe pour récupérer les differents données
        class Restaurant {
            constructor(name, note, image, drive_time) {
                this.name = name;
                this.note = note;
                this.image = image;
                this.drive_time = drive_time;
            }
        }

        /* data_restaurant est un tableau qui aura plusieurs
        tableaux qui auront trois class Restaurant chacune*/
        let data_restaurant = ref([]);
        
        /* créer un tableau qui va comporter trois classes
        restaurant et le pousser à remplir le tableau 
        data_restaurant*/
        const makeDataRestaurant = () => {
            //tableau pour les trois restaurants à chaque fois
            let three_restaurant = [];

            for(const restaurant of BDD) {
                const new_restaurant = new Restaurant(restaurant.name, restaurant.note, restaurant.image, restaurant.drive_time)
                
                if(three_restaurant.length === 2) {
                    //on repush les nouveaux restaurants
                    three_restaurant.push(new_restaurant); //donc là y en a 3 vue qu'yavait 2 et on vient de pusher un autre
                    //On va le pusher dans data_restaurant vu que y en a 3 restaurants
                    data_restaurant.value.push(three_restaurant);
                    //ensuite on le vide
                    three_restaurant = [];
                }
                else {
                    //s'il n'en a pas 2, on continue de push
                    three_restaurant.push(new_restaurant);
                }
            }
        }
        /*lancer la fonction makeDataRestaurant à
        un cycle de vie de quand tous les composants
        sont chargés (onMounted)*/
        onMounted(makeDataRestaurant);

        //return
        return {
            data_restaurant
        }

    }  
}
</script>

<style lang="scss" scoped> 
.home {
    .header {
        height: 120px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
            width: 200px;
        }
        input {
            background-color: #f6f6f6;
            border: none;
            height: 60px;
            width: 400px;
            outline:none;
            padding-left: 20px;
        }
    }
    .banniere {
        height: 200px;
        width: 100%;
        background-image: url("https://www.ubereats.com/restaurant/_static/7b308f7cbbf8e335ceda0447a8bd7c63.png");
        background-size: cover;
        background-position: center center;
    }
}
</style>