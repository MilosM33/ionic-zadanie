<template>
	<ion-app>
		<ion-split-pane content-id="main-content">
			<ion-menu content-id="main-content">
				<ion-header>
					<ion-toolbar>
						<ion-title>Menu</ion-title>
					</ion-toolbar>
				</ion-header>
				<ion-content>
					<ion-list id="projects">
						<ion-menu-toggle :auto-hide="false">
							<ion-item>
								<ion-label @click="openProjects()">All projects</ion-label>
							</ion-item>
						</ion-menu-toggle>
					</ion-list>
					<div class="projects-container">
						<ion-list id="projects">
							<ion-menu-toggle :auto-hide="false">
								<ion-item v-for="project in projects">
									<ion-label @click="openList(project.id)">{{
										project.title
									}}</ion-label>
								</ion-item>
							</ion-menu-toggle>
						</ion-list>
					</div>
					<ion-list id="controls">
						<ion-menu-toggle :auto-hide="false">
							<ion-item>
								<ion-label @click="addProject()">Add project</ion-label>
							</ion-item>
							<ion-item>
								<ion-label @click="openSummary()">Summary</ion-label>
							</ion-item>
						</ion-menu-toggle>

						<ion-menu-toggle :auto-hide="false"> </ion-menu-toggle>
						<ion-menu-toggle :auto-hide="false">
							<ion-item>
								<ion-label @click="logout()">Sign out</ion-label>
							</ion-item>
						</ion-menu-toggle>
					</ion-list>
				</ion-content>
			</ion-menu>
			<ion-router-outlet id="main-content"></ion-router-outlet>
		</ion-split-pane>
	</ion-app>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import { RouterView } from "vue-router";

import { alertController } from "@ionic/vue";
import {
	IonApp,
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonInput,
	IonCard,
	IonIcon,
	IonSplitPane,
	IonMenuButton,
	IonMenuToggle,
	IonButtons,
	IonButton,
	IonMenu,
	IonItem,
	IonRouterOutlet,
	IonList,
	IonLabel,
} from "@ionic/vue";

import AStatusBadge from "@/plugins/lib@projectmanagement/_components/a-status-badge.vue";
import AProjectCard from "@/plugins/lib@projectmanagement/_components/a-project-card.vue";

export default {
	name: "List",
	components: {
		IonApp,
		IonContent,
		IonHeader,
		IonPage,
		IonTitle,
		IonToolbar,
		IonInput,
		IonCard,
		IonIcon,
		IonMenu,
		IonSplitPane,
		IonMenuButton,
		IonMenuToggle,
		IonButton,
		IonButtons,
		IonItem,
		RouterView,
		IonRouterOutlet,
		IonList,
		IonLabel,
		AStatusBadge,
		AProjectCard,
	},
	data() {
		return {
			pageName: "",
		};
	},

	computed: {
		...mapGetters(["projects"]),
	},
	setup() {
		// Toto prehod tam kde to realne volas, nemusis to mat ako premennu
		const alertButtons = ["CANCEL", "CREATE"];
		const alertInputs = [
			{
				placeholder: "Name",
				name: "name",
			},
		];

		return {
			alertInputs,
			alertButtons,
		};
	},

	methods: {
		openProjects() {
			this.$router.replace({
				name: "Lists",
			});
		},
		openList(id: number) {
			this.$router.replace({
				name: "List",
				params: {
					id,
				},
			});
		},

		async addProject() {
			const alertButtons = [
				{
					text: "Cancel",
					role: "cancel",
				},
				{
					text: "Create",
					role: "create",
				},
			];
			const alertInputs = [
				{
					placeholder: "Name",
					name: "name",
				},
			];

			const alert = await alertController.create({
				header: "Add project",
				buttons: alertButtons,
				inputs: alertInputs,
			});

			await alert.present();

			const { data, role } = await alert.onDidDismiss();

			if (role === "create") {
				const title =
					data.values.name === "" ? "Unnamed project" : data.values.name;

				this.$store.dispatch("addProject", {
					title,
				});
			}
		},

		logout() {
			localStorage.removeItem("token");
			this.$store.commit("logout", null);
			this.$router.replace({
				name: "Login",
			});
		},
		openSummary() {
			this.$router.replace({
				name: "Summary",
			});
		},
	},
};
</script>

<style scoped>
.projects-container {
	height: 400px;

	overflow-y: auto;

	padding: 0px;
}
</style>
