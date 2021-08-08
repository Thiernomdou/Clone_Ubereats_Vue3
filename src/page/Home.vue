<template>
    <div class="home">
        <div class="header">
            <img src="https://d3i4yxtzktqr9n.cloudfront.net/web-eats-v2/ee037401cb5d31b23cf780808ee4ec1f.svg"
                alt="logo_ubereats">

            <div class="wrapper-input">
                <input v-model="user_search_restaurant" type="text" placeholder="De quoi avez vos envie ?">
                <div class="search">
                    <!-- Pour avoir chaque restaurant avec son nom -->
                    <router-link v-for="(restaurant, index) in search_restaurant" :key="index" :to="{name: 'Restaurant', params: { name: restaurant.name }}">
                        <div class="container-restaurant-search">
                            <div class="wrapper-img">
                                <img :src="restaurant.image" alt="restaurant_recherché">
                            </div>
                            <p>{{ restaurant.name }}</p>
                        </div>
                    </router-link>
                </div>
            </div>

        </div>
        <div class="banniere">
        </div>
        <RestaurantRow v-for="(data, index) in data_restaurant" :key="index" :three_restaurant="data" />
    </div>
</template>

<script>
    //IMPORT
    import BDD from '@/BDD'

    //COMPONENTS
    import RestaurantRow from '@/components/RestaurantRow'
    import {
        onMounted,
        ref,
        watch
    } from 'vue'
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

            //tableau récupérant tous les restaurants
            let all_restaurant = [];

            /* créer un tableau qui va comporter trois classes
            restaurant et le pousser à remplir le tableau 
            data_restaurant*/
            const makeDataRestaurant = () => {
                //tableau pour les trois restaurants à chaque fois
                let three_restaurant = [];

                for (const restaurant of BDD) {
                    const new_restaurant = new Restaurant(restaurant.name, restaurant.note, restaurant.image,
                        restaurant.drive_time)

                    //make all restaurant array
                    all_restaurant.push(new_restaurant);

                    if (three_restaurant.length === 2) {
                        //on repush les nouveaux restaurants
                        three_restaurant.push(
                            new_restaurant); //donc là y en a 3 vue qu'yavait 2 et on vient de pusher un autre
                        //On va le pusher dans data_restaurant vu que y en a 3 restaurants
                        data_restaurant.value.push(three_restaurant);
                        //ensuite on le vide
                        three_restaurant = [];
                    } else {
                        //s'il n'en a pas 2, on continue de push
                        three_restaurant.push(new_restaurant);
                    }
                }
            }


            //Recherche du restaurant par l'utilisateur
            let user_search_restaurant = ref('');

            //
            let search_restaurant = ref([]);

            /*watch permet de lancer une fonction à chaque fois 
            qu'une valeur change*
            - le premier paramètre est la variable à regarder
            - le 2eme paramètre est nouvelle valeur*/
            watch(user_search_restaurant, new_value => {
                //RegExp sert à tester les chaines de caractère
                let regex = RegExp(new_value.toLowerCase());
                /*La méthode filter permet de créer un nouveau
                tableau à partir d'un taleau existant,
                si ça remplie une certaine condition*/
                //La méthode test pour tester les chaines de caractère
                let new_search_restaurant = all_restaurant.filter(restaurant => regex.test(restaurant.name
                    .toLowerCase()));
                /*quand on veut changer la valeur de la réference
                search_restaurant, il ne faut pas accéder directement
                au nom de la variable il faut utiliser .value après la variable*/
                search_restaurant.value = new_search_restaurant;

                //pour ne pas avoir tous les tableaux quand on saisit rien
                new_value == 0 ? search_restaurant.value = [] : search_restaurant.value = new_search_restaurant;
            })

            /*lancer la fonction makeDataRestaurant à
            un cycle de vie de quand tous les composants
            sont chargés (onMounted)*/
            onMounted(makeDataRestaurant);

            //return
            return {
                data_restaurant,
                user_search_restaurant,
                search_restaurant
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

            .wrapper-input {
                position: relative;

                input {
                    background-color: #f6f6f6;
                    border: none;
                    height: 60px;
                    width: 400px;
                    outline: none;
                    padding-left: 20px;
                }

                .search {
                    position: absolute;
                    top: 100%;
                    width: 100%;
                    background-color: #fff;


                    .container-restaurant-search {
                        display: flex;
                        align-items: center;
                        padding: 10px;

                        &:hover {
                            background: #f6f6f6;
                        }

                        .wrapper-img {
                            height: 60px;
                            width: 60px;
                            margin-right: 25px;
                            border-radius: 50%;
                            overflow: hidden;

                            img {
                                height: 100%;
                                width: auto;
                            }
                        }
                    }
                }
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