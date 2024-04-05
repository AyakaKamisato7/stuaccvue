import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'appHome',
    redirect: '/login',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/stuaccsys/accLogin.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/accHome',
    name: 'accHome',
    component: () => import('../views/stuaccsys/accHome.vue'),
    children: [
      { path: '/stuAccount', component: () => import('../views/stuaccsys/magPage/stuAccount.vue') },
      { path: '/manAccount', component: () => import('../views/stuaccsys/magPage/manAccount.vue') },
      { path: '/pendingComplaint', component: () => import('../views/stuaccsys/magPage/pendingComplaint.vue') },
      { path: '/eventManage', component: () => import('../views/stuaccsys/magPage/eventManage.vue') },
      { path: '/chatRoom', component: () => import('../views/stuaccsys/magPage/chatRoom.vue') },
    ]
  },
  {
    path: '/reservation',
    name: 'reservation',
    component: () => import('../views/stuaccsys/stuPage/reservation.vue')
  },
  {
    path: '/complaint',
    name: 'complaint',
    component: () => import('../views/stuaccsys/stuPage/complaint.vue')
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('../views/stuaccsys/stuPage/events.vue')
  },
  {
    path: '/repair',
    name: 'repair',
    component: () => import('../views/stuaccsys/stuPage/repair.vue')
  },
  {
    path: '/order',
    name: 'order',
    component: () => import('../views/stuaccsys/stuPage/order.vue')
  },
  {
    path: '/stuabout',
    name: 'stuabout',
    component: () => import('../views/stuaccsys/stuPage/stuabout.vue')
  },
  {
    path: '/wellbeing',
    name: 'wellbeing',
    component: () => import('../views/stuaccsys/stuPage/wellbeing.vue')
  },
  // {
  //   path: '/home',
  //   name: 'home',
  //   component: () => import('../views/educationalAdministration/educationHome.vue'),
  //   children: [
  //     { path: '/stuInfo', component: () => import('../views/educationalAdministration/studentPage/stuInfo.vue') },
  //     { path: '/classInfo', component: () => import('../views/educationalAdministration/studentPage/classInfo.vue') },
  //     { path: '/scoreInfo', component: () => import('../views/educationalAdministration/studentPage/scoreInfo.vue') },
  //     { path: '/courseInfo', component: () => import('../views/educationalAdministration/teacherPage/courseInfo.vue') },
  //     { path: '/scoreGivenInfo', component: () => import('../views/educationalAdministration/teacherPage/scoreGivenInfo.vue') },
  //     { path: '/teaInfo', component: () => import('../views/educationalAdministration/teacherPage/teaInfo.vue') },
  //     { path: '/courseMgt', component: () => import('../views/educationalAdministration/adminPage/courseMgt.vue')},
  //     { path: '/stuMgt', component: () => import('../views/educationalAdministration/adminPage/stuMgt.vue') },
  //     { path: '/teaMgt', component: () => import('../views/educationalAdministration/adminPage/teaMgt.vue') },
  //     { path: '/examMgt', component: () => import('../views/educationalAdministration/adminPage/examMgt.vue') },
  //     { path: '/enrollmentMgt', component: () => import('../views/educationalAdministration/adminPage/enrollmentMgt.vue') },
  //     { path: '/scoreMgt', component: () => import('../views/educationalAdministration/adminPage/scoreMgt.vue') }
  //   ]
  // },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
