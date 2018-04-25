import Vue from 'vue'
import Router from 'vue-router'
//自定义路由
import HomeComponent from '../components/home'
import ListComponent from '../components/list'
import DetailComponent from '../components/detail'
import LoginComponent from '../components/login'
import FicationComponent from '../components/fication'
import CityComponent from '../components/city'
import RecommendComponent from '../components/recommend'
import ShoppingComponent from '../components/shopping'
import UserComponent from '../components/user'
import RegisterComponent from '../components/register'
import SearchComponent from '../components/search'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home/:id',
      component: HomeComponent
    },
    {
      path: '/home',
      component: HomeComponent
    },
    {
      path: '/list/:id',
      component:  ListComponent
    },
    {
      path:'/detail/:id',
      component:DetailComponent
    },
    {
      path:'/login',
      component:LoginComponent
    },
    {
    	path: '/register',
    	component: RegisterComponent
    },
    {
      path:'/fication',
      component:FicationComponent
    },
    {
      path:'/city',
      component:CityComponent
    },
    {
    	path:'/recommend',
    	component:RecommendComponent
    },
    {
    	path:'/shopping/:id',
    	component:ShoppingComponent
    },
    {
    	path:'/shopping',
    	component:ShoppingComponent
    },
    {
    	path:'/user',
    	component:UserComponent
    },
    {
      path:'*',
      component:HomeComponent
    },
    {
    	path:'/search/:id',
      component:SearchComponent
    }
  ]
})
