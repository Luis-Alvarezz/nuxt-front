<template>
  <div>
    <h1>Iniciamos Sesion Usando BackEnd YUJUUUUUUUU</h1>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  middleware: 'detect-push',
  mounted () {
    // const token = localStorage.getItem('token')
    const CookieToken = Cookies.get('token')
    // console.log('Cookie -->', CookieToken)
    if (!CookieToken) {
      this.$router.push('/') // Redireccionamos al login
    }
  }
}
</script>
