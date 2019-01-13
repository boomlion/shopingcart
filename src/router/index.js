import Vue from 'vue'
import Router from 'vue-router'
import list from '@/components/list/list'
import more from '@/components/more/more'
import cart from '@/components/cart/cart'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',

      redirect: '/more'
    },
    {
      path: '/list',
      name: 'list',
      component: list,
      children: [
        {
          path: '/more',
          component: more
        },
        {
          path: '/cart',
          component: cart
        }
      ]
    }
  ]
})
