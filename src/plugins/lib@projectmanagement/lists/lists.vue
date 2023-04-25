<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-title>{{ this.$route.name }}</ion-title>
				<ion-buttons slot="start">
					<ion-menu-button></ion-menu-button>
				</ion-buttons>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<a-project-card
				v-for="project in projects"
				@click="openList(project.id)"
				:project="project"
			></a-project-card>

			<ion-alert
				header="Please enter project name"
				:buttons="alertButtons"
				:inputs="alertInputs"
				:is-open="addProjectModal"
				@didDismiss="onAddProject($event)"
			></ion-alert>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import { mapGetters } from "vuex";
import {
	IonContent,
	IonHeader,
	IonToolbar,
	IonButtons,
	IonMenuButton,
	IonPage,
	IonBadge,
	IonAlert,
} from "@ionic/vue";

import AStatusBadge from "../_components/a-status-badge.vue";
import AProjectCard from "../_components/a-project-card.vue";

export default {
	components: {
		IonContent,
		IonPage,
		IonAlert,
		IonHeader,
		IonToolbar,
		IonButtons,
		IonMenuButton,
		IonBadge,
		AStatusBadge,
		AProjectCard,
	},
	data() {
		return {
			addProjectModal: false,
		};
	},

	computed: {
		...mapGetters(["projects"]),
	},
	setup() {
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
	mounted() {
		this.$store.dispatch("fetchProjects");
	},

	methods: {
		openList(id: number) {
			this.$router.replace({
				name: "List",
				params: {
					id,
				},
			});
		},

		toggleAddProjectModal() {
			this.addProjectModal = !this.addProjectModal;
		},

		onAddProject(event: any) {
			const name = event.detail.data.values.name;

			if (name) {
				this.$store.commit("addProject", {
					name,
				});
			}

			this.toggleAddProjectModal();
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
