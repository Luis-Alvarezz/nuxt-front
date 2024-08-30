<template>
  <div>
    <v-row>
      <v-spacer />
      <v-btn>Crear Estudiante</v-btn>
    </v-row>
    <v-row align="center" justify="center">
      <v-data-table :headers="headers" :items="estudiantes">
      </v-data-table>
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
          text: 'Nombre',
          align: 'center',
          sortable: true,
          value: 'apaterno'
        },
        {
          text: 'Nombre',
          align: 'center',
          sortable: true,
          value: 'amaterno'
        },
        {
          text: 'Nombre',
          align: 'center',
          sortable: true,
          value: 'correo'
        },
        {
          text: 'Nombre',
          align: 'center',
          sortable: true,
          value: 'direccion'
        },
        {
          text: 'Nombre',
          align: 'center',
          sortable: true,
          value: 'telefono'
        },
        {
          text: 'Nombre',
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
      const token = Cookies.get('Token')
      // Obtenemos AXIOS para dirigirnos a la Pagina:
      this.$axios.get('/usuarios', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then((res) => {
        console.log('respuesta de axios', res.data)
        if (res.data.message === 'success') {
          this.estudiantes = res.data.estudiantes
        }
      }).catch((err) => {
        console.log('Error!= ', err)
      })
    }
  }
}
</script>
