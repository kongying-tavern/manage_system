
const routes = [
  {
    path:'/login',
    component: () => import('pages/login.vue'),
  },
  {
    path: '/',
    redirect: 'layer_edit'
  },
  {
    path: '/index',
    name:'index',
    component: () => import('pages/index.vue'),
    children:[
      {
        path:'/layer_edit',
        name:'layer_edit',
        component: () => import('components/layer_edit'),
      },
      {
        path:'/layer_review',
        component: () => import('components/layer_review'),
      },
      // {
      //   path:'/user_manage',
      //   component: () => import('components/user_manage'),
      // },
    ],
  },
]

export default routes
