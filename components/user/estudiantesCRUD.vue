<template>
  <div>
    <v-row align="center" justify="center">
      <v-spacer />
      <v-btn class="mb-5" color="blue-grey darken-3" @click="showDialog = true">Crear Estudiante</v-btn>
    </v-row>
    <v-row align="center" justify="center">
      <v-data-table
        :headers="headers"
        :items="estudiantes"
        class="blue-grey darken-2"
        >
        <template #[`item.Acciones`]=" { item }">
          <v-tooltip bottom color="green darken-3">
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon color="green darken-1" @click="actualiza(item)" v-bind="attrs" v-on="on">
                <v-icon>mdi-update</v-icon>
              </v-btn>
            </template>
            <span>Actualizar al Estudiante {{ item.nombre }} </span>
          </v-tooltip>
          <v-tooltip bottom color="red darken-2"> <!-- Para el placeholder con hover al colocar mouse en boton de basura-->
            <template #activator="{ on, attrs }">
              <v-btn icon color="red darken-3" @click="borrar(item)" v-bind="attrs" v-on="on">
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </template>
            <span>Eliminar Estudiante {{ item.nombre }} </span>
          </v-tooltip>
        </template>
      </v-data-table>
    </v-row>
    <v-dialog v-model="showDialog" width="600" persistent>
      <v-card color="grey darken-2">
        <v-card-title>Crear un Estudiante</v-card-title>
        <v-card-text ref="formCreate">
          <v-form>
            <v-row align="center" justify="center">
              <v-text-field v-model="nombre" placeholder="Ingresa tu nombre" label="Nombre(s)" />
            </v-row>
            <v-row>
              <v-text-field v-model="apaterno" placeholder="Ingresa tu Apellido Paterno" label="A.Paterno" />
            </v-row>
            <v-row>
              <v-text-field v-model="amaterno" placeholder="Ingresa tu Apellido Materno" label="A.Materno" />
            </v-row>
            <v-row>
              <v-text-field v-model="direccion" placeholder="Ingresa tu direccion completa" label="Domicilio" />
            </v-row>
            <v-row>
              <v-text-field v-model="telefono" placeholder="p.ej: 457 123 5689" label="Numero de Telefono" />
            </v-row>
            <v-row>
              <v-text-field v-model="correo" placeholder="p.ej. correo@correo.com" label="Correo Electrónico" />
            </v-row>
            <v-row>
              <v-text-field v-model="usuario" placeholder="Ingresa tu usuario" label="Usuario" />
            </v-row>
            <v-row>
              <v-text-field v-model="password" placeholder="Ingresa tu contraseña mayor a 6 caracteres" label="Password" />
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-row align="center" justify="center" class="mb-2 gap-2">
            <v-btn @click="showDialog = false" color="error" class="mr-4">
              Cancelar
            </v-btn>
            <v-btn @click="crearEstudiante" color="green" class="ml-4">
              Agregar
            </v-btn>
          </v-row>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
          value: 'Acciones'
        }
      ],
      showDialog: false,
      nombre: '',
      apaterno: '',
      amaterno: '',
      direccion: '',
      telefono: '',
      correo: '',
      usuario: '',
      password: '',
      token: null
    }
  },
  mounted () {
    // Cuando carga toda la pagina, mandamos a llamar los estudiantes
    this.loadEstudiantes()
  },
  methods: {
    loadEstudiantes () {
      this.token = Cookies.get('token') // Obtenemos token del backend
      console.log('Token:', this.token)
      // Obtenemos AXIOS para dirigirnos a la Pagina:
      this.$axios.get('/usuarios', {
        headers: {
          Authorization: `Bearer ${this.token}`
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
    },
    crearEstudiante () {
      const body = {
        nombre: this.nombre,
        apaterno: this.apaterno,
        amaterno: this.amaterno,
        direccion: this.direccion,
        telefono: this.telefono,
        correo: this.correo,
        usuario: this.usuario,
        password: this.password
      } // Obtenemos la URL para crear usuario desde Backend
      this.$axios.post('/create', body, {
        headers: {
          Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'
        }
      }).then((res) => {
        console.log('Respuesta de Peticion a Backend para Crear', res)
        if (res && res.data && res.data.message === 'User create sucess') {
          this.loadEstudiantes()
          this.showDialog = false
          this.nombre = ''
          this.apaterno = ''
          this.amaterno = ''
          this.correo = ''
          this.direccion = ''
          this.telefono = ''
          this.usuario = ''
          this.password = ''
        }
      }).catch((res) => {
        console.error('ERROR al obtener peticion del backend', res)
      })
    },
    borrar (item) { // PARA BORRAR USUARIO POR ID
      // console.log('Item desde borrar -->', item), nos retorna el objeto del usuario
      this.$axios.delete(`/delete_study/${item.id}`, {
        headers: {
          Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json'
        }
      })
        .then((res) => {
          this.loadEstudiantes()
        })
        .catch((res) => {
          console.log('Error al eliminar estudiante ->', res)
        })
    }
  }
}
</script>
