import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history:  createWebHashHistory(''),
  routes: [
    {
      path: '/',
      name: '默认页',
      component: () => import('../components/Root.vue')
    },
    {
      path: '/dialog',
      name: '对话框',
      component: () => import('../components/Dialog.vue')
    },
    {
      path: '/fontwarning',
      name: '字体提示',
      component: () => import('../components/FontWarning.vue')
    },
    {
      path: '/taskpane',
      name: '任务窗格',
      component: () => import('../components/TaskPane.vue')
    },
    {
      path: '/formatpanel',
      name: '排版微调',
      component: () => import('../components/FormatPanel.vue')
    },
    {
      path: '/memory',
      name: '记忆管理',
      component: () => import('../components/MemoryPanel.vue')
    }
  ]
})

export default router
