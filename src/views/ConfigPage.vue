<template>
  <ion-page>
    <ion-header mode="ios">
      <ion-toolbar mode="ios">
        <ion-label class="tituloPagina">Configurações</ion-label>
        <ion-button
          fill="clear"
          router-direction="back"
          slot="end"
          size="small"
          color="primary"
          router-link="/"
        >
          <ion-icon
            slot="icon-only"
            class="iconToolbar"
            :icon="arrowBackCircle"
        /></ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <ion-row class="ion-justify-content-center">
          <ion-col class="ion-align-items-center" size="12">
            <ion-button color="secondary" expand="block" size="large" @click="this.$router.push('/infoConfiguracoes/congregacoes')">
              <ion-icon slot="start" :icon="business" />
              Congregações
            </ion-button>
          </ion-col>
          <ion-col class="ion-align-items-center" size="12">
            <ion-button color="secondary" expand="block" size="large" @click="this.$router.push('/infoConfiguracoes/cargos')">
              <ion-icon slot="start" :icon="ribbon" />
              Cargos
            </ion-button>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import { arrowBackCircle, create, business, ribbon } from "ionicons/icons";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButton,
  IonIcon,
  IonContent,
  IonGrid,
  IonCol,
  IonRow,
} from "@ionic/vue";

export default defineComponent({
  name: "ConfigPage",
  components: {
    IonPage,
    IonHeader,
    IonToolbar,
    IonButton,
    IonIcon,
    IonContent,
    IonGrid,
    IonCol,
    IonRow,
  },
  data() {
    return {
      //urlServer: "https://isosed-server.herokuapp.com",
     urlServer: "http://192.168.18.4:4041",
      arrowBackCircle,
      create,
      business,
      ribbon
    };
  },
});
</script>

<style>
</style>