<template>
	<ion-page
		><ion-header>
			<ion-toolbar>
				<ion-title>{{ this.$route.name }}</ion-title>
				<ion-buttons slot="start">
					<ion-menu-button></ion-menu-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content class="ion-padding">
			<div v-for="project in projects">
				<h3>
					{{ project.title }}
				</h3>

				<div>
					<ion-item v-for="task in getTasks(project.id)">
						<a-status-badge :priority="task.priority" class="mx-4" />
						{{ task.name }}
					</ion-item>
				</div>
			</div>
		</ion-content>
	</ion-page>
</template>

<script>
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonInput,
	IonItem,
} from "@ionic/vue";
import { mapGetters } from "vuex";

import AStatusBadge from "../_components/a-status-badge.vue";

export default {
	components: {
		IonContent,
		IonHeader,
		IonPage,
		IonTitle,
		IonToolbar,
		IonInput,
		IonItem,
		AStatusBadge,
	},
	data() {
		return {
			summary: {},
			isToastOpen: false,
			toastMessage: "",
		};
	},

	computed: {
		...mapGetters(["projects"]),

		uncompletedTasks() {
			return this.projects.reduce((acc, project) => {
				return acc + project.items.filter((item) => !item.completed).length;
			}, 0);
		},
	},
	mounted() {
		this.$store.dispatch("fetchProjects");
	},

	methods: {
		getTasks(id) {
			const project = this.projects.find((project) => {
				return project.id === id;
			});
			return project.items
				.filter((task) => !task.is_checked)
				.sort((a, b) => {
					return b.priority - a.priority;
				});
		},
	},
};
</script>

<style scoped>
.mx-4 {
	margin-right: 2rem;
}
</style>
