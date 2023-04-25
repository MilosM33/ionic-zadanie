import { createStore } from "vuex";
import axios from "axios";

export default createStore({
	state() {
		return {
			lists: [],
			// R: review Takto si getnes z localstorage veci vzdy pri laodnuti stranky
			// R: review V pripade ze niesi lognuty authguard na routeri ta hodi na login ak sa snazis ist na guardnutu page

			token: localStorage.getItem("token") || "",
		};
	},
	mutations: {
		login(state, payload) {
			localStorage.setItem("token", payload.data.token);

			state.token = payload.data.token;
		},
		setLoading(state, payload) {
			state.loading = payload;
		},
		logout(state) {
			state.token = "";
		},
		updateProjects(state, data) {
			state.lists = data.lists;
		},
	},
	actions: {
		fetchProjects({ commit }) {
			return new Promise((resolve, reject) => {
				axios
					.get(
						"https://projects-manager.wezeo.team/cms/api/v1/shopping-lists",
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem("token")}`,
							},
						}
					)
					.then((res) => {
						this.state.lists = res.data.data;

						resolve(res);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},

		addTask({ commit }, payload) {
			return new Promise((resolve, reject) => {
				const { projectId, item } = payload;
				axios
					.post(
						`https://projects-manager.wezeo.team/cms/api/v1/shopping-lists/${projectId}/items`,
						{
							name: item.name,
							is_checked: false,
							priority: 0,
						},
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem("token")}`,
							},
						}
					)
					.then((res) => {
						this.dispatch("fetchProjects");

						resolve(res);
					})
					.catch((error) => {
						reject(error);
					});
			});
		},

		async addProject({ commit }, payload) {
			return new Promise((resolve, reject) => {
				const title = payload.title;
				axios
					.post(
						"https://projects-manager.wezeo.team/cms/api/v1/shopping-lists",
						{
							title,
							items: [],
						},
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem("token")}`,
							},
						}
					)
					.then((res) => {
						this.dispatch("fetchProjects");

						resolve(res);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},

		async removeProject({ commit }, payload) {
			return new Promise((resolve, reject) => {
				axios
					.delete(
						`https://projects-manager.wezeo.team/cms/api/v1/shopping-lists/${payload.projectId}`,
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem("token")}`,
							},
						}
					)
					.then((res) => {
						this.dispatch("fetchProjects");
						resolve(res);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},

		async removeFinishedItems({ commit }, payload) {
			return new Promise((resolve, reject) => {
				axios
					.delete(
						`https://projects-manager.wezeo.team/cms/api/v1/shopping-lists/${payload.projectId}/items`,
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem("token")}`,
							},
						}
					)
					.then((res) => {
						this.dispatch("fetchProjects");
						resolve(res);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},
		async removeTask({ commit }, payload) {
			return new Promise((resolve, reject) => {
				axios
					.delete(
						`https://projects-manager.wezeo.team/cms/api/v1/shopping-lists/${payload.projectId}/items/${payload.itemId}`,
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem("token")}`,
							},
						}
					)
					.then((res) => {
						this.dispatch("fetchProjects");
						resolve(res);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},

		async changeTaskStatus({ commit }, payload) {
			return new Promise((resolve, reject) => {
				axios
					.put(
						`https://projects-manager.wezeo.team/cms/api/v1/shopping-lists/${payload.projectId}/items/${payload.itemId}`,
						{
							id: payload.itemId,
							is_checked: payload.is_checked,
						},
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem("token")}`,
							},
						}
					)
					.then((res) => {
						this.dispatch("fetchProjects");
						resolve(res);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},
		async changeTaskPriority({ commit }, payload) {
			return new Promise((resolve, reject) => {
				axios
					.put(
						`https://projects-manager.wezeo.team/cms/api/v1/shopping-lists/${payload.projectId}/items/${payload.itemId}`,
						{
							id: payload.itemId,
							priority: payload.priority,
						},
						{
							headers: {
								Authorization: `Bearer ${localStorage.getItem("token")}`,
							},
						}
					)
					.then((res) => {
						this.dispatch("fetchProjects");
						resolve(res);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},

		async login({ commit }, payload) {
			return new Promise((resolve, reject) => {
				axios
					.post("https://projects-manager.wezeo.team/cms/api/v1/auth/login", {
						login: payload.email,
						password: payload.password,
					})
					.then((res) => {
						const data = res.data;

						commit("login", data);

						this.dispatch("fetchProjects");

						resolve(res);
					})
					.catch((err) => {
						reject(err);
					});
			});
		},
	},
	getters: {
		projects(state) {
			

			return state.lists;
		},

		authenticated(state) {
			return state.token !== "";
		},

		loading(state) {
			return state.loading;
		},
	},
});
