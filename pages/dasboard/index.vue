<template>
  <div>
    <h1>Iniciamos Sesion Usando BackEnd YUJUUUUUUUU</h1>
    <EstudiantesCRUD />
  </div>
</template>

<script>
import Cookies from 'js-cookie'
import estudiantesCRUD from '~/components/user/estudiantesCRUD.vue'

export default {
  components: estudiantesCRUD,
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
