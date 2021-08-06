<template>
  <div class="home">
  <RestaurantRow />
  </div>
</template>

<script>
//IMPORT
//import BDD from '@/BDD'
//COMPONENTS
import RestaurantRow from '@/components/RestaurantRow'
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

        var resto = new Restaurant('restaurant Thierno', 4.5, 'img', '45mn')
        console.log(resto);
    }  
}
</script>

<style>

</style>