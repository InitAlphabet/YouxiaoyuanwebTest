import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css';
import 'element-ui/lib/theme-chalk/base.css';// fade/zoom 等
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition'//展开折叠
import ElementUI from 'element-ui';
import axios from "axios";
import VueRouter from "vue-router";

Vue.prototype.$axios=axios;
Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(CollapseTransition)
Vue.component(CollapseTransition.name, CollapseTransition);
const router=new VueRouter({
  mode:"hash",
  routes:[
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',//这个不能乱写，第一个默认只能写/
      name: 'login',
      component: () => import('./components/index'),
      meta: {
        title: "优效源",
        icon: 'logo.png'//路由守护元,可以保存信息，比如页面icon
      }
    },
    {
      path:'/yxy',
      name:'yxy',
      component:()=>import('./components/mainhost/inIndex.vue'),
      meta:{
        icon: 'logo.png'
      },
      children:[
        {
         path:'main',
         name:'main',
         component:()=>import('./components/mainhost/main.vue'),
         meta:{
           icon: '../logo.png'
         }
        },
        {
          path: 'sel',
          name: 'sel',
          component: () => import('./components/mainhost/selPlace.vue'),
          meta: {
            icon: '../logo.png'
          },
        },
        {
             path:'floor1',
             name:'floor1',
             component:()=>import('./components/mainhost/floor1.vue'),
             meta:{
               title:"一楼战场",
               icon:'../logo.png'
             }
        },
        {
          path:'floor2',
          name:'floor2',
          component:()=>import('./components/mainhost/floor2.vue'),
          meta:{
            title:"二楼战场",
            icon:'../logo.png'
          }
        },
        {
          path:'floor3',
          name:'floor3',
          component:()=>import('./components/mainhost/floor3.vue'),
          meta:{
            title:"三楼战场",
            icon:'../logo.png'
          }
        }
      ]
    }
  ]
});

//路由进入页面的时候的预处理
router.beforeEach((to, from, next) => {
  //beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) {//判断是否有标题
    document.title = to.meta.title
  }
  if(to.meta.icon)
  {
    document.getElementsByTagName('link')[0].setAttribute('href',to.meta.icon)
  }
  next()
  //执行进入路由，如果不写就不会进入目标页
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
