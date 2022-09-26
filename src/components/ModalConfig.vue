<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Visualizar</ion-title>

      <ion-button @click="confirm()" color="success" slot="end" fill="clear">
        <ion-icon
          slot="icon-only"
          class="iconToolbar"
          :icon="arrowBackCircle"
        />
      </ion-button>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-grid>
      <ion-row>
        <ion-col size="12" class="ion-text-center">
          <ion-label id="titleConfig">{{ titleAdd }}</ion-label>
        </ion-col>
      </ion-row>

      <ion-row class="ion-justify-content-center borderModalView">
        <ion-col size="12" class="ion-align-items-center">
          <ion-row class="ion-justify-content-center">
            <ion-col size="9">
              <ion-item mode="md">
                <ion-label position="floating">Nome: </ion-label>
                <ion-input color="secondary"></ion-input>
              </ion-item>
            </ion-col>

            <ion-col size="2" class="ion-align-self-center">
              <ion-button color="secondary" fill="clear">
                <ion-icon slot="icon-only" :icon="addCircle" />
              </ion-button>
            </ion-col>
          </ion-row>
        </ion-col>
      </ion-row>

      <ion-row>
        <ion-col size="12" class="ion-text-center">
          <ion-label id="titleConfig">Selecione para Editar:</ion-label>
        </ion-col>
      </ion-row>

      <ion-row class="ion-justify-content-center borderModalView">
        <ion-col size="12" class="ion-align-items-center">
          <ion-item mode="md">
            <ion-label position="stacked">{{ nomePg }} </ion-label>
            <ion-select
              v-model="nomeObj"
              color="secondary"
              placeholder="CARREGANDO..."
              v-if="!listaObj"
            >
            </ion-select>
            <ion-select
              v-else
              v-model="nomeObj"
              color="secondary"
              placeholder="Selecione"
              cancel-text="CANCELAR"
              ok-text="OK"
            >
              <ion-select-option
                v-for="Objeto in listaObj"
                :key="Objeto.id"
                :value="Objeto.nome"
                >{{ Objeto.nome }}</ion-select-option
              >
            </ion-select>
          </ion-item>
        </ion-col>

        <ion-row class="ion-justify-content-center">
          <ion-col size="12" class="ion-align-items-center">
            <ion-row class="ion-justify-content-center">
              <ion-col size="9">
                <ion-item mode="md">
                  <ion-label position="floating">Nome: </ion-label>
                  <ion-input color="secondary" v-model="nomeObj"></ion-input>
                </ion-item>
              </ion-col>

              <ion-col size="2" class="ion-align-self-center">
                <ion-button color="secondary" fill="clear">
                  <ion-icon slot="icon-only" :icon="save" />
                </ion-button>
              </ion-col>
            </ion-row>
          </ion-col>
        </ion-row>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
import { defineComponent } from "vue";
//import axios from "axios";
import { arrowBackCircle, addCircle,save } from "ionicons/icons";
import {
  IonItem,
  IonLabel,
  IonInput,
  IonHeader,
  IonToolbar,
  IonIcon,
  IonButton,
  IonTitle,
  IonContent,
  modalController,
  IonGrid,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption
} from "@ionic/vue";

export default defineComponent({
  name: "ModalConfig",
  components: {
    IonItem,
    IonLabel,
    IonInput,
    IonHeader,
    IonToolbar,
    IonButton,
    IonTitle,
    IonContent,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonSelect,
  IonSelectOption
  },
  data() {
    return {
      arrowBackCircle,
      addCircle,
      save,
      nomeObj:null
    };
  },
  methods: {
    confirm() {
      return modalController.dismiss(null, "confirm");
    },
  },
  props: {
    nomePg: null,
    listaObj: null,
    titleAdd: null,
  },
});
</script>

<style>
#titleConfig {
  color: darkslategray;
  font-size: 20px !important;
  font-weight: bold;
}
.borderModalView ion-icon {
  font-size: 30px;
}
</style>