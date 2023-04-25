<template>
	<ion-checkbox
		slot="start"
		disabled="true"
		aria-label="Checkbox 1"
	></ion-checkbox>
	<ion-input
		placeholder="New task"
		disabled="false"
		v-model="form.name"
		@keydown.enter="addTask"
	></ion-input>
</template>

<script>
import { useRoute } from "vue-router";

import { IonCheckbox, IonInput } from "@ionic/vue";

export default {
	name: "AAddList",
	components: {
		IonCheckbox,
		IonInput,
	},

	data() {
		return {
			// Vzdy by som to daval kvoli konzistentnosti cez form: {} a potom form.name
			form: {
				name: "",
			},
		};
	},

	methods: {
		async addTask() {
			if (this.form.name == "") {
				return;
			}

			// R: review Pridaj trycatch
			try {
				this.$store.dispatch("addTask", {
					projectId: this.$route.params.id,
					item: {
						name: this.form.name,
					},
				});
				this.form.name = "";
			} catch (error) {}
		},
	},
};
</script>
