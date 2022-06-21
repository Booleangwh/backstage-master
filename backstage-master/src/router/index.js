import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "../views/Login";
import Home from "../views/Home";
import Goods from "../views/Goods";



Vue.use(VueRouter)


const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
    hidden:true
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,

  },
  {
    path: '/tablegoods',
    name: 'Tablegoods',
    component: () => import('../views/goods/tablegoods')
  },
  {
    path: '/addgoods',
    name: 'addgoods',
    component: () => import('../views/goods/addgoods'),
  },
  {
    path: '/classifygoods',
    name: 'classifygoods',
    component: () => import('../views/goods/classifygoods'),
  },
  {
    path: '/addcategory',
    name: 'addcategory',
    component: () => import('../views/goods/classifygoods/compnent/addcategory'),
  },
  {
    path: '/userlist',
    name: 'userlist',
    component: () => import('../views/authority/userlist'),
  },
  {
    path: '/orderlist',
    name: 'orderlist',
    component: () => import('../views/authority/orderlist'),
  },
]

const router = new VueRouter({
  routes
})

export default router
