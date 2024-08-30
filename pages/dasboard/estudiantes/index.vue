<template>
  <div>
    <v-row align="center" justify="center">
      <h1>Desde Estudiantes</h1>
    </v-row>
  </div>
</template>

<script>
import Cookies from 'js-cookie'
export default {
  middleware: 'detect-push',
  mounted () {
    const CookieToken = Cookies.get('token')
    if (!CookieToken) {
      this.$router.push('/')
    }
  }
}
</script>
