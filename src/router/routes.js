
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/Home') },
      { path: '/blog=:id', component: () => import('pages/Blog') },
      { path: '/tags/:tag', component: () => import('pages/Home') },
      { path: 'new=blog', component: () => import('pages/newBlog') },
      { path: 'login', component: () => import('pages/Login') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
