<template>
  <ion-page>
     <ion-header mode="ios">
    <ion-toolbar mode="ios">
      <ion-button
        fill="clear"
        router-direction="back"
        slot="end"
        size="small"
        color="primary"
        router-link="/">
        <ion-icon slot="icon-only" class="iconToolbar" :icon="arrowBackCircle"
      /></ion-button>
    </ion-toolbar>
  </ion-header>
</ion-page>
</template>

<script>
import { defineComponent } from "vue";
//import axios from "axios";
import { arrowBackCircle } from "ionicons/icons";
import { IonPage,IonHeader,IonToolbar,IonButton,IonIcon } from "@ionic/vue";

export default defineComponent({
  name: "ConfigPage",
  components: {
    IonPage,IonHeader,IonToolbar,IonButton,IonIcon
  },
  data() {
    return {
        arrowBackCircle
    };
  },
});
</script>

<style>
</style>