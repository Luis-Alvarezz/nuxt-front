<template>
   <v-app>
      <v-main>
         <!-- alineacion -->
         <!-- <v-row align="center" justify="center" heigth="18vh" width="18vw" color="blue-gray-lighten-2"> </v-row>   -->
         <v-row align="center" justify="center" class="login" >
          <!-- Para cargar todos los componentes externos -->
         <Nuxt />
       </v-row>  
      </v-main>
   </v-app>
</template>

<script> 

</script>

<style scoped>
   .login {
      width: 100%;
      height: 100vh;
      background-color: #90A4AE;
   }
</style>
