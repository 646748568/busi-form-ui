import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import UserList from '@/components/UserList'
import UserAdd from '@/components/UserAdd'
import GenerateEntity from "@/components/GenerateEntity";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      children: [
        {
          path: 'user-list',
          name: 'UserList',
          component: UserList
        },
        {
          path: 'user-add',
          name: 'UserAdd',
          component: UserAdd
        },
        {
          path: 'generate-entity',
          name: 'GenerateEntity',
          component: GenerateEntity
        }
      ]
    }
  ]
})
