import Cookies from 'js-cookie'
// Programacion para obtener las rutas de cada pagina y asi eliminar el TOKEN cuando sea raiz
// import { redirect } from "@nuxtjs/auth/lib/module/defaults";
export default function ({ route, redirect }) {
  // console.log('navegating --> ', route.path)
  if (route.path === '/') {
    if (Cookies.get('token')) {
      Cookies.remove('token')
    }
  }
}
