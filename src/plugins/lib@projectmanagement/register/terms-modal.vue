<template>
	<ion-header class="terms-container">
		<ion-title> Terms and conditions </ion-title>

		<ion-button @click="cancel()">Close</ion-button>
	</ion-header>

	<ion-content class="ion-padding">
		<h3>Collection of personal information</h3>
		<p>
			You can access and use the Mobile Application and Services without telling
			us who you are or revealing any information by which someone could
			identify you as a specific, identifiable individual. If, however, you wish
			to use some of the features offered in the Mobile Application, you may be
			asked to provide certain Personal Information (for example, your name and
			e-mail address). We receive and store any information you knowingly
			provide to us when you create an account, or fill any forms in the Mobile
			Application. Some of the information we collect is directly from you via
			the Mobile Application and Services. However, we may also collect Personal
			Information about you from other sources such as public databases and our
			joint marketing partners. You can choose not to provide us with your
			Personal Information, but then you may not be able to take advantage of
			some of the features in the Mobile Application. Users who are uncertain
			about what information is mandatory are welcome to contact us.
		</p>
	</ion-content>
</template>

<script>
import { IonHeader, IonButton, IonContent, modalController } from "@ionic/vue";

export default {
	components: {
		IonHeader,
		IonButton,
		IonContent,
	},
	methods: {
		cancel() {
			return modalController.dismiss(null, "cancel");
		},
	},
};
</script>
