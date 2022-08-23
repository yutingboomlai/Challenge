import Vue from 'vue'
import Router from 'vue-router'

//signup
import SignUp from '@/components/SignUp'
//login
import AppHeader from '@/components/AppHeader'
//search stock
import LineChart from '@/components/LineChart'
//dashboard
import DashBoard from '@/components/DashBoard'
//helloworld
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({

  routes: [
    { path: '/signup', name: 'SignUp', component: SignUp},
    { path: '/appheader', name: 'Login', component: AppHeader },
    { path: '/linechart', name: 'LineChart', component: LineChart},
    { path: '/dashboard', name: 'DashBoard', component: DashBoard},
    { path: '/helloworld', name: 'HelloWorld', component: HelloWorld},
  ]
})
