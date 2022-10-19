<template>
  <ion-page>
    <ion-header mode="ios" @click="teste()">
      <ion-toolbar mode="ios">
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
      urlServer: "https://isosed-server.herokuapp.com",
     // urlServer: "http://192.168.18.4:4041",
      arrowBackCircle,
      create,
      business,
      ribbon
    };
  },
  methods:{
    teste(){
      var tel = "00000000000"
      var auxTel = "("+tel;
      tel = auxTel.substring(0,3);
      auxTel = auxTel.substring(3);
      tel = tel+") ";
      auxTel = auxTel.substring(0,6) +"-"+auxTel.substring(5)
      tel = tel + auxTel
      console.log(tel)
      console.log(auxTel)


    }
  }
});
</script>

<style>
</style>