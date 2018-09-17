import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);
const Index = (resolve) => require(['../pages/index.vue'], resolve);
const Goods = (resolve) => require(['../pages/goods/index.vue'], resolve);
const Ratings = (resolve) => require(['../pages/ratings/index.vue'], resolve);
const Sellers = (resolve) => require(['../pages/sellers/index.vue'], resolve);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      children: [
        {
          path: '/goods',
          name: 'goods',
          component: Goods
        },
        {
          path: '/ratings',
          name: 'ratings',
          component: Ratings
        },
        {
          path: '/sellers',
          name: 'sellers',
          component: Sellers
        }
      ]
    }
  ]
})
