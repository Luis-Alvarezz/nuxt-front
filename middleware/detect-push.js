import Cookies from 'js-cookie'
// Programacion para obtener las rutas de cada pagina y asi eliminar el TOKEN cuando sea raiz
// import { redirect } from "@nuxtjs/auth/lib/module/defaults";
export default function ({ route, redirect }) {
  if (route.path === '/') {
    if (Cookies.get('token')) {
      Cookies.remove('token')
    }
  }
  // console.log('navegating --> ', route.path)
}
