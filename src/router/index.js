import { createWebHashHistory, createRouter } from 'vue-router'
import Index from '@/pages/index.vue'
import Login from '@/pages/login.vue'
import NotFound from '@/pages/404.vue'

// import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs'
const routes = [{
    path: '/',
    component: Index
},
{
    path: '/login',
    component: Login
},
{
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
}
];                                                                                                                                                                                                                {}
const router = createRouter({
    history: createWebHashHistory(),
    routes
});
export default router;