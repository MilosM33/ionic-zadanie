<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Login</ion-title>
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
            v-model="form.email"
          ></ion-input>
        </ion-item>
        <ion-item v-if="v$.form.email.$errors.length">
          <div
            class="input-errors"
            v-for="(error, index) of v$.form.email.$errors"
            :key="index"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </ion-item>
        <ion-item>
          <ion-input
            label="Password"
            labelPlacement="floating"
            placeholder="Enter text"
            type="password"
            v-model="form.password"
          ></ion-input>
        </ion-item>
        <ion-item v-if="v$.form.password.$errors.length">
          <div
            class="input-errors"
            v-for="(error, index) of v$.form.password.$errors"
            :key="index"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </ion-item>

        <div class="m-2">
          Or you can
          <router-link class="text-blue" :to="{ name: 'Register' }"
            >create an account</router-link
          >
        </div>
      </div>
    </ion-content>

    <ion-footer>
      <ion-toolbar>
        <ion-button expand="block" @click="login">LOGIN</ion-button>
      </ion-toolbar>
    </ion-footer>
  </ion-page>
</template>

<script>
// R: review Nepouzivaj lang=ts lebo ti to moze robit problemy (to ti mozem potom vysvetlit kedy sa ma pouzivat a preco ho my nepouzivame)
import {
  IonContent,
  IonHeader,
  IonFooter,
  IonPage,
  IonButton,
  IonTitle,
  IonToolbar,
  IonInput,
  IonToast,
} from "@ionic/vue";

import { useVuelidate } from "@vuelidate/core";
import { required, email } from "@vuelidate/validators";

import { toastController } from "@ionic/vue";

export default {
  components: {
    IonContent,
    IonHeader,
    IonFooter,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
  },

  data() {
    return {
      // R: review Ked mas taketo formy tak si daj do data iba ze form: {} | potom vo v-model mozes dat normalne form.email a to prida do neho property email
      // R: review Potom keby ho resetujes len zavolas this.form = {} a nemusis vsetko samostatne resetovat
      form: {
        email: "",
        password: "",
      },
    };
  },
  validations() {
    return {
      form: {
        email: { required, email },
        password: { required },
      },
    };
  },

  // R: review Skus pridat vuelidate na validaciu fieldov

  methods: {
    async login() {
      // R: review Skus si triggernut toast cez javascript. Je to krajsie a nemusis mat premennu, a nastavis kolko s ma byt viditelny

      // R: review Toto nahradis potom vuelidate validaciou

      const isFormCorrect = await this.v$.$validate();

      if (!isFormCorrect) {
        return;
      }

      // R: review BE cally vzdy wrapni do try catch, akonahle ti await request prejde tak je to success a nemusis pozerat store uz ci si authentifikovany
      // try {
      // 	await this.$store.dispatch(...)
      // 	this.$router.push(...)
      // } catch (error) {
      // 	toast.error(...)
      // }

      try {
        await this.$store.dispatch("login", {
          ...this.form,
        });

        this.$router.replace({ name: "Lists" });
      } catch (error) {
        const errorMessage = error.response.data.error;

        const toast = await toastController.create({
          message: errorMessage,
          duration: 1500,
        });
        await toast.present();

        this.form = {};
      }

      // R: review Po logine sa mi neloadnu polozky, musim refreshnut stranku
    },
  },
  setup() {
    return { v$: useVuelidate() };
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
.input-errors {
  color: red;
}
</style>
