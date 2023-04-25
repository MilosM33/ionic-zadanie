<template>
	<ion-card class="card">
		<ion-card-title> {{ project.title }} </ion-card-title>

		<ion-item v-for="item in sortTasks">
			<div slot="start">
				<div :class="item.is_checked ? 'item-done' : ''">{{ item.name }}</div>
			</div>
			<div slot="end">
				<A-status-badge
					:priority="item.priority"
					:text="item.name"
				></A-status-badge>
			</div>
		</ion-item>

		<ion-label v-if="tasksCount > 3">
			{{ tasksCount - 3 }} more tasks
		</ion-label>
	</ion-card>
</template>

<script>
import AStatusBadge from "../_components/a-status-badge.vue";

export default {
	name: "ProjectCard",
	components: { AStatusBadge },
	props: {
		project: {
			type: Object,
			default: {},
		},
	},
	computed: {
		sortTasks() {
			return this.project.items
				.sort((a, b) => b.priority - a.priority)
				.slice(0, 3);
		},
		tasksCount() {
			return this.project.items.length;
		},
	},
	methods: {
		openProject() {
			this.$router.replace({
				name: "List",
				params: {
					id: this.project.id,
				},
			});
		},
	},
};
</script>

<style scoped>
.card {
	padding: 2rem;
}
.item-done {
	text-decoration: line-through;
}
</style>
