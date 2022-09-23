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
        <ion-label class="titlePageConfig">
          Cadastrar novas informações
        </ion-label>
        </ion-row>

        <ion-row class="ion-justify-content-start borderModalViewMembro">
          <ion-col size="12" class="ion-align-items-center">
            <ion-row class="ion-justify-content-between">
              <ion-col size="9">
                <ion-item mode="md">
                  <ion-label position="floating">Nova Congregação: </ion-label>
                  <ion-input
                    style="font-weight: bold"
                    color="secondary"
                  ></ion-input>
                </ion-item>
              </ion-col>

              <ion-col size="2">
                <ion-row class="ion-justify-content-end">
                <ion-button color="secondary" fill="clear" size="large">
                  <ion-icon
                    slot="icon-only"
                    class="iconButtonEdit"
                    :icon="save"/>
                </ion-button>
                </ion-row>
              </ion-col>
            </ion-row>
          </ion-col>
           <ion-col size="12" class="ion-align-items-center">
            <ion-row class="ion-justify-content-between">
              <ion-col size="9">
                <ion-item mode="md">
                  <ion-label position="floating">Novo Cargo: </ion-label>
                  <ion-input
                    style="font-weight: bold"
                    color="secondary"
                  ></ion-input>
                </ion-item>
              </ion-col>

              <ion-col size="2">
                <ion-row class="ion-justify-content-end">
                <ion-button color="secondary" fill="clear" size="large">
                  <ion-icon
                    slot="icon-only"
                    class="iconButtonEdit"
                    :icon="save"/>
                </ion-button>
                </ion-row>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>

        <ion-row class="ion-justify-content-center">
        <ion-label class="titlePageConfig">
          Editar Informações
        </ion-label>
        </ion-row>

        <ion-row class="ion-justify-content-center">
          <ion-col class="ion-align-items-center" size="12">
            <ion-button color="secondary"  expand="block" size="large">
              <ion-icon slot="start" :icon="business" />
                Congregações
                </ion-button>
          </ion-col>
           <ion-col class="ion-align-items-center" size="12">
            <ion-button color="secondary"  expand="block" size="large">
              <ion-icon slot="start" :icon="ribbon"/>
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
//import axios from "axios";
import { arrowBackCircle,create,save,business,ribbon } from "ionicons/icons";
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
  IonItem,
  IonInput,
  IonLabel
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
    IonItem,
    IonInput,
    IonLabel,
  },
  data() {
    return {
      arrowBackCircle,
      create,
      business,
      save,
      ribbon
    };
  },
});
</script>

<style>
.titlePageConfig{
  font-size: 22px;
  padding: 10px;
  color:darkslategrey
}
ion-label {
  overflow: visible;
  font-weight: bold;
}
</style>