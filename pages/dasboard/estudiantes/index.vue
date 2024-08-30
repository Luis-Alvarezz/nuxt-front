<template>
  <div>
    <v-row align="center" justify="center">
      <h1>Desde Estudiantes</h1>
    </v-row>
    <estudiantesCRUD />
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import estudiantesCRUD from '~/components/user/estudiantesCRUD.vue'

export default {
  components: {
    estudiantesCRUD
  },
  middleware: 'detect-push',
  mounted () {
    const CookieToken = Cookies.get('token')
    if (!CookieToken) {
      this.$router.push('/')
    }
  }
}
</script>
