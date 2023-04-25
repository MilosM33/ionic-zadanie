<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-icon
					:icon="arrowBackOutline"
					slot="start"
					@click="openProjects"
					class="ion-padding"
				></ion-icon>
				<ion-title>{{ project.title }}</ion-title>
				<ion-icon
					:icon="trashOutline"
					slot="end"
					@click="removeProject"
					class="ion-padding"
				></ion-icon>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<!-- R: review Zmen toto na ion-sliding-item aby si ho vedel slidenut doboku -->
			<ion-item-sliding v-for="item in undoneTasks" :key="item.id">
				<ion-item>
					<ion-checkbox
						slot="start"
						aria-label="Checkbox 1"
						:checked="item.is_checked"
						@ionChange="changeTaskStatus(item)"
					></ion-checkbox>
					<ion-input v-model="item.name"></ion-input>
					<a-status-badge
						:priority="item.priority"
						@click="openPicker(item)"
					></a-status-badge>
				</ion-item>
				<ion-item-options>
					<ion-item-option color="danger">
						<ion-icon :icon="trashOutline" @click="removeTask(item)" />
					</ion-item-option>
				</ion-item-options>
			</ion-item-sliding>
			<ion-item>
				<a-add-list />
			</ion-item>

			<ion-item>
				<h1 slot="start">Finished Tasks</h1>
				<ion-icon
					slot="end"
					size="small"
					:icon="trashOutline"
					@click="removeFinishedItems()"
				></ion-icon>
			</ion-item>
			<ion-item v-for="item in doneTasks" :key="item.id">
				<ion-checkbox
					slot="start"
					aria-label="Checkbox 1"
					:checked="item.is_checked"
					@ionChange="changeTaskStatus(item)"
				></ion-checkbox>
				<ion-label>{{ item.name }}</ion-label>
			</ion-item>
		</ion-content>
	</ion-page>
</template>

<script>
import { mapGetters } from "vuex";

import { pickerController } from "@ionic/vue";
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonInput,
	IonIcon,
	IonCheckbox,
	IonItemSliding,
	IonItemOptions,
	IonItemOption,
} from "@ionic/vue";
import { trashOutline, arrowBackOutline } from "ionicons/icons";

import AStatusBadge from "../_components/a-status-badge.vue";
import AAddList from "./_components/a-add-list.vue";

import columns from "./priority-options.constants";

export default {
	name: "List",
	components: {
		IonContent,
		IonHeader,
		IonPage,
		IonTitle,
		IonToolbar,
		IonInput,
		IonItemSliding,
		IonItemOptions,
		IonItemOption,
		IonIcon,
		IonCheckbox,
		AStatusBadge,
		AAddList,
	},
	data() {
		return {
			// R: review Data ktore setujes davaj defaultne na null. Vtedy vies v-if loader ze ak je to null
			// Potom ak ti pride error tak nastav project = {error: error} a vtedy vies handlenut aj vypisanie error
			project: {
				title: "",
				items: null,
			},
			taskName: null,
			selectedItemId: null,
			trashOutline,
			arrowBackOutline,
		};
	},
	computed: {
		...mapGetters(["projects", "loading"]),

		project() {
			return (
				this.projects.find(
					(project) => project.id == this.$route.params.id
				) ?? { title: "" }
			);
		},
		doneTasks() {
			const project = this.projects.find(
				(project) => project.id == this.$route.params.id
			);
			if (project?.items == undefined) {
				return [];
			}
			return project.items.filter((item) => item.is_checked);
		},

		undoneTasks() {
			const project = this.projects.find(
				(project) => project.id == this.$route.params.id
			);
			if (project?.items == undefined) {
				return [];
			}
			return project.items
				.filter((item) => !item.is_checked)
				.sort((a, b) => {
					return b.priority - a.priority;
				});
		},
	},

	methods: {
		openProjects() {
			this.$router.replace({
				name: "Lists",
			});
		},
		removeProject() {
			this.$store.dispatch("removeProject", {
				projectId: this.$route.params.id,
			});
			this.openProjects();
		},
		removeTask(item) {
			this.$store.dispatch("removeTask", {
				projectId: this.$route.params.id,
				itemId: item.id,
			});
		},
		removeFinishedItems() {
			this.$store.dispatch("removeFinishedItems", {
				projectId: this.$route.params.id,
			});
		},

		async changeTaskStatus(item) {
			const itemId = item.id;

			this.$store.dispatch("changeTaskStatus", {
				projectId: this.$route.params.id,
				itemId,
				is_checked: !item.is_checked,
			});
		},
		async openPicker(item) {
			this.selectedItemId = item.id;

			// R: review Tieto optiony (columns) si daj vedla do suboru napr priority-options.constants.ts a tam ich daj ze export default [{}, ...]
			// Tu si to potom len importnes ze import columns from './priority-options.constants.ts'
			const picker = await pickerController.create({
				columns,
				buttons: [
					{
						text: "Cancel",
						role: "cancel",
					},
					{
						text: "Confirm",
						handler: async (value) => {
							this.$store.dispatch("changeTaskPriority", {
								projectId: this.$route.params.id,
								itemId: this.selectedItemId,
								priority: value.Priority.value,
							});
						},
					},
				],
			});
			await picker.present();
		},
	},
};
</script>
