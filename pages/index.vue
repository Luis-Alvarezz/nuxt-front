<template>
  <div>
    <loginUser />
  </div>
</template>

<script>
import loginUser from '@/components/user/loginUser.vue'

export default {
  name: 'IndexPage',
  components: {
    loginUser
  },
  layout: 'login',
  middleware: 'detect-push'
}
</script>
