<template>
  <v-card color="blue-grey darken-2" width="450" style="padding: 5%;">
    <v-card-tittle class="text-h4">
      <p class="text-center" style=" width: 100%;">
        Bienvenido
      </p>
    </v-card-tittle>
    <v-card-text>
      <v-row style="width: 100%;">
        <v-text-field
          v-model="usuario"
          label="Usuario"
          placeholder="Escribe tu usuario"
          filled
          rounded
          dense
        ></v-text-field>
      </v-row>
      <v-row style="width: 100%;">
        <v-text-field
          v-model="password"
          label="Password"
          placeholder="Escribe tu contraseña"
          filled
          rounded
          dense
          type="password"
          :rules="[emptyField, specialChars, sizePassword]"
        ></v-text-field>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-row aling="center" justify="center" style=" width: 100%;" class="mb-2 mt-2">
        <v-btn elevation="0" @click="loginBackend">
          <span style="text-transform: none;">
            Ingresar
          </span>
          <v-icon>
            mdi-account-arrow-right
          </v-icon>
        </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      usuario: '',
      password: '',
      emptyField:
        value => !!value || 'No puede estar vacio',
      specialChars:
        value => value && /^[A-Za-z0-9]/.test(value),
      sizePassword:
        value => (value && value.length > 6) || 'Minimo 6 caracteres'
    }
  },
  methods: {
    loginBackend () {
      const body = {
        usuario: this.usuario,
        password: this.password
      }
      this.$axios.post('/login', body)
        .then((res) => {
          //  console.log('respuesta ->', res)
          if (res.data && res.data.token) {
            // console.log('Token=>', res.data.token);
            this.$router.push('/dasboard')
          }
        })
        .catch((err) => {
          console.log('ERROR!= ', err)
        })
    }
  }
}
</script>
