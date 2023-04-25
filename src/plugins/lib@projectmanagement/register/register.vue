<template>
	<ion-page>
		<ion-header :translucent="true">
			<ion-toolbar>
				<ion-title>Register</ion-title>
			</ion-toolbar>
		</ion-header>

		<ion-content :fullscreen="true">
			<ion-header collapse="condense">
				<ion-toolbar>
					<ion-title size="large">Blank</ion-title>
				</ion-toolbar>
			</ion-header>

			<div id="container">
				<ion-item>
					<ion-input
						label="Email"
						labelPlacement="floating"
						placeholder="Enter text"
					></ion-input>
				</ion-item>
				<ion-item>
					<ion-input
						label="Password"
						labelPlacement="floating"
						placeholder="Enter text"
						type="password"
					></ion-input>
				</ion-item>

				<!-- R: review Tu by som pouzil $router.replace aby sa nedala animacia a v historii sa nahradila akutalna page
				<> -->

				<div class="m-2">
					Or you can
					<p class="text-blue" @click="$router.replace({ name: 'Login' })">
						login to your existing account
					</p>
				</div>

				<!-- R: review Skus si modal triggernut cez JS. To si ho mozes spravit ako keby dalsiu page a tu iba posles tomu modalu. Takze sa ti to tu nebude mixovat -->
			</div>
		</ion-content>

		<ion-footer>
			<ion-toolbar>
				<p class="terms">
					By clicking on the "Register" button, you agree to our
					<span class="text-blue" @click="openModal()">Terms of Service</span>
				</p>

				<ion-button expand="block">REGISTER</ion-button>
			</ion-toolbar>
		</ion-footer>
	</ion-page>
</template>

<script>
import {
	IonContent,
	IonHeader,
	IonFooter,
	IonPage,
	IonTitle,
	IonToolbar,
	IonInput,
	IonModal,
	modalController,
} from "@ionic/vue";

import termsModal from "./terms-modal.vue";

export default {
	components: {
		IonContent,
		IonHeader,
		IonPage,
		IonTitle,
		IonToolbar,
		IonInput,
		IonModal,
	},

	methods: {
		async openModal() {
			const modal = await modalController.create({
				component: termsModal,
			});
			modal.present();
		},
	},
};
</script>

<style scoped>
.m-2 {
	margin: 2rem;
}
.text-blue {
	color: var(--ion-color-primary);
}
.terms {
	text-align: center;
	margin: 2rem 3rem;
}
.terms-container {
	display: flex;
	justify-content: space-between;

	padding: 1.5rem 2rem;
}
</style>
