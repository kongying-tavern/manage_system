import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })
  // function getCookie(cname)
  // {
  //   var name = cname + "=";
  //   var ca = document.cookie.split(';');
  //   for(var i=0; i<ca.length; i++) 
  //   {
  //     var c = ca[i].trim();
  //     if (c.indexOf(name)==0) return c.substring(name.length,c.length);
  //   }
  //   return "";
  // }
  // Router.beforeEach((to, from, next) => {
  //   if (to.path != '/login' && getCookie('logincookie')=="" )
  //   {
  //     next({ path: '/login' })
  //   }
  //   else
  //   {
  //     next();
  //   }
  // });
  return Router
}
