<template>
	<ion-badge :class="getPriority()['priority']">
		{{ getPriority()["text"] }}
	</ion-badge>
</template>

<script>
export default {
	name: "AStatusBadge",
	components: {},
	props: {
		priority: {
			type: Number,
			default: 0,
		},
	},
	setup() {
		// Daj do xxx.constants.ts ako som pisal v list.vue openPicker()
		const badge = {
			5: {
				priority: "highPriority",
				text: "High Priority",
			},
			4: {
				priority: "important",
				text: "Important",
			},

			3: {
				priority: "normal",
				text: "Normal",
			},

			2: {
				priority: "should",
				text: "Should",
			},

			1: {
				priority: "optional",
				text: "Optional",
			},

			0: {
				priority: "",
				text: "None",
			},
		};
		return { badge };
	},

	methods: {
		getPriority() {
			return this.badge[this.priority];
		},
	},
};
</script>
<style scoped>
ion-badge {
	--background: #505050;
	--color: white;
}
ion-badge.optional {
	--background: var(--ion-color-primary);
	--color: white;
}
ion-badge.should {
	--background: #97cf00;
	--color: white;
}
ion-badge.normal {
	--background: #21a600;
	--color: white;
}

ion-badge.important {
	--background: #ff5e00;
	--color: white;
}

ion-badge.highPriority {
	--background: #d90000;
	--color: white;
}
</style>
