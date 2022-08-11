import {createRouter, createWebHistory} from 'vue-router'
import Index from "../pages/Index.vue";
import Generate from "../pages/Generate.vue";
import About from "../pages/About.vue";

const routes = [
	{ path: '/', name: 'Home', component: Index },
	{ path: '/about', name: 'About', component: About },
	{ path: '/generate', name: 'Generate', component: Generate },
]

export default new createRouter({
	history: createWebHistory(),
	routes, // short for `routes: routes`
})