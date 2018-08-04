import Vue from 'vue'
import Router from 'vue-router'
let __import__ = (page) => _ => import('page/'+ page+ '.vue');
Vue.use(Router)
let router = new Router({
  routes: [

    {
      path: '/messages',
      name: 'messages',
      component: __import__('messages/index'),
      meta: {
        tier: 0,
        requireSignin: true,
        slide: true
      }
    },
    {
      path: '/setting',
      name: 'setting',
      component: __import__('account/setting'),
      meta: {
        tier: 1,
        requireSignin: true,
        page: 'children'
      }
    },
    {
      path: '/accountmanage',
      name: 'accountmanage',
      component: __import__('account/accountmanage'),
      meta: {
        tier: 2,
        requireSignin: true,
        page: 'children'
      }
    },
    {
      path: '/chat/:id',
      name: 'chat',
      component: __import__('messages/chat'),
      meta: {
        tier: 10,
        requireSignin: true,
        page: 'children'
      }
    },

    {
      path: '/linkman',
      name: 'linkman',
      component: __import__('linkman/index'),
      meta: {
        tier: 0,
        requireSignin: true,
        slide: true
      }
    },
    {
      path: '/addfriend',
      name: 'addfriend',
      component: __import__('linkman/addfriend'),
      meta: {
        tier: 1,
        requireSignin: true,
        page: 'children'
      }
    },
    {
      path: '/newfriend',
      name: 'newfriend',
      component: __import__('linkman/newfriend'),
      meta: {
        tier: 2,
        requireSignin: true,
        page: 'children'
      }
    },
    {
      path: '/allrequest',
      name: 'allrequest',
      component: __import__('linkman/allrequest'),
      meta: {
        tier: 3,
        requireSignin: true,
        page: 'children'
      }
    },
    {
      path: '/friendrequest/:id',
      name: 'friendrequest',
      component: __import__('linkman/friendrequest/index'),
      meta: {
        tier: 4,
        requireSignin: true,
        page: 'children'
      },
      children: [{
        path: '/friendrequest/friendset/:id',
        name: 'friendset',
        component: __import__('linkman/friendrequest/friendset'),
        meta: {
          requireSignin: true,
          page: 'children'
        }
      }]
    },
    {
      path: '/usercard/:account',
      name: 'usercard',
      component: __import__('linkman/usercard/index'),
      meta: {
        tier: 6,
        requireSignin: true,
        page: 'children'
      },
      children: [{
        path: '/usercard/friendadd/:id',
        name: 'friendadd',
        component: __import__('linkman/usercard/friendadd'),
        meta: {
          requireSignin: true,
          page: 'children'
        }
      }]
    },
    {
      path: '/roomcard/:account',
      name: 'roomcard',
      component: __import__('linkman/roomcard/index'),
      meta: {
        tier: 8,
        requireSignin: true,
        page: 'children'
      }
    },
    {
      path: '/roomcard/room_member_list/:id',
      name: 'room_member_list',
      component: __import__('linkman/roomcard/room-member-list'),
      meta: {
        requireSignin: true,
        tier: 9,
        page: 'children'
      }
    },
    {
      path: '/edituser',
      name: 'edituser',
      component: __import__('linkman/edituser/index'),
      meta: {
        requireSignin: true,
        page: 'children',
        tier: 8
      }
    },
    {
      path: '/birthday',
      name: 'birthday',
      component: __import__('linkman/edituser/birthday'),
      meta: {
        requireSignin: true,
        page: 'children',
        tier: 9
      }
    },
    {
      path: '/avatar',
      name: 'avatar',
      component: __import__('linkman/edituser/avatar'),
      meta: {
        requireSignin: true,
        page: 'children',
        tier: 9
      }
    },
    
    
    {
      path: '/login',
      name: 'login',
      component: __import__('login'),
      meta: {
        tier: 0,
        page: 'children'
      },
    },
    {
      path: '/register',
      name: 'register',
      redirect: '/register/nickname',
      children: [
        {
          path: 'success',
          name: 'register_success',
          component: __import__('register/register-success'),
          meta: {
            tier: 3,
            page: 'children',
            step: 3
          }
        },
        {
          path: 'nickname',
          name: 'register_nickname',
          component: __import__('register/register-nickname'),
          meta: {
            step: 1,
            page: 'children',
            tier: 1
          }
        },
        {
          path: 'password',
          name: 'register_password',
          component: __import__('register/register-password'),
          meta: {
            step: 2,
            page: 'children',
            tier: 2
          }
        }
      ],
      component: __import__('register/index')
    },
    {
      path: '*',
      redirect: '/messages'
    }
  ]
});
// ..

export default router 
