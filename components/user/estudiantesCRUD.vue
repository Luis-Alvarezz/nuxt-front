<template>
  <div>
    <v-row align="center" justify="center">
      <v-spacer />
      <v-btn>Crear Estudiante</v-btn>
    </v-row>
    <v-row align="center" justify="center">
      <v-data-table :headers="headers" :items="estudiantes" />
    </v-row>
  </div>
</template>

<script>
import Cookies from 'js-cookie'

export default {
  // variable para almacenar TODOS los estudiantes que traigo de mi base de datos
  data () {
    return {
      estudiantes: [],
      headers: [
        {
          text: 'Nombre',
          align: 'center',
          sortable: true,
          value: 'nombre'
        },
        {
          text: 'Apellido Paterno',
          align: 'center',
          sortable: true,
          value: 'apaterno'
        },
        {
          text: 'Apellido Materno',
          align: 'center',
          sortable: true,
          value: 'amaterno'
        },
        {
          text: 'Correo Electrónico',
          align: 'center',
          sortable: true,
          value: 'correo'
        },
        {
          text: 'Dirección',
          align: 'center',
          sortable: true,
          value: 'direccion'
        },
        {
          text: 'Teléfono',
          align: 'center',
          sortable: true,
          value: 'telefono'
        },
        {
          text: 'Acciones',
          align: 'center',
          sortable: true,
          actions: ''
        }
      ]
    }
  },
  mounted () {
    // Cuando carga toda la pagina, mandamos a llamar los estudiantes
    this.loadEstudiantes()
  },
  methods: {
    loadEstudiantes () {
      const token = Cookies.get('token')
      console.log('Token:', token)
      // Obtenemos AXIOS para dirigirnos a la Pagina:
      this.$axios.get('/usuarios', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log('respuesta de axios', res.data)
        if (res.data.message === 'success') {
          this.estudiantes = res.data.usuarios
          console.log(this.estudiantes)
        }
      }).catch((err) => {
        console.log('Error en Axios!= ', err)
      })
    }
  }
}
</script>
