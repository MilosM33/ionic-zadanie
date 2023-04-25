import { createRouter, createWebHistory } from "@ionic/vue-router";
import { RouteRecordRaw } from "vue-router";
import store from "@/plugins/app/_config/store";

const routes: Array<RouteRecordRaw> = [
	{
		path: "/login",
		name: "Login",
		component: () => import("@/plugins/lib@projectmanagement/login/login.vue"),
	},
	{
		path: "/register",
		name: "Register",
		component: () =>
			import("@/plugins/lib@projectmanagement/register/register.vue"),
	},

	{
		path: "/list/:id",
		name: "List",
		component: () => import("@/plugins/lib@projectmanagement/list/list.vue"),
	},

	{
		path: "/",
		name: "Dashboard",
		component: () => import("@/plugins/lib@projectmanagement/lists/lists.vue"),
	},
	{
		path: "/lists",
		name: "Lists",
		component: () => import("@/plugins/lib@projectmanagement/lists/lists.vue"),
	},
	{
		path: "/summary",
		name: "Summary",
		component: () =>
			import("@/plugins/lib@projectmanagement/summary/summary.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

router.beforeEach((to, from, next) => {
	const authenticated = store.getters["authenticated"];
	console.log(authenticated);

	if (to.name !== "Login" && to.name !== "Register" && !authenticated) {
		next({
			name: "Login",
		});
	} else {
		next();
	}
});

export default router;
