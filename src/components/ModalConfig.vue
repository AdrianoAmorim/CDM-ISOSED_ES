<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>{{ nomePg }}</ion-title>
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
      <ion-row class="ion-justify-content-center borderModalView">
        <ion-col size="12" class="ion-align-items-center">
          <ion-row class="ion-justify-content-center">
            <ion-col size="10">
              <ion-item mode="md">
                <ion-label position="floating">{{ labelInpConfig }} </ion-label>
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

      <ion-row class="ion-justify-content-center">
        <ion-col size="12" class="ion-align-items-center">
            <ion-searchbar
              mode="ios"
              :debounce="1000"
              animated="true"
              show-cancel-button="never"
              placeholder="Buscar Congregação"
              class="searchBarConfig"
            />
        </ion-col>

       
          <ion-col size="6">
            <ion-row class="ion-justify-content-start">
              <ion-label id="titleConfig">Editar:</ion-label>
            </ion-row>
          </ion-col>
          <ion-col size="6" class="ion-align-self-center">
            <ion-row class="ion-justify-content-end">
              <ion-label id="infoTituloEditar">Salvar - Excluir</ion-label>
            </ion-row>
          </ion-col>
    

        <ion-col size="12">
          <ion-list lines="none">
            <ion-item v-for="Obj in listaObj" :key="Obj.id" mode="ios">
              
              <ion-input color="secondary" placeholder="Carregando" :value="Obj.nome"></ion-input>

              <ion-button size="small" fill="clear" slot="end">
              <ion-icon
                color="secondary"
                slot="icon-only"
                class="iconToolbar"
                :icon="save"
              />
              </ion-button>

              <ion-button size="small" fill="clear" slot="end">
              <ion-icon
                color="danger"
                slot="icon-only"
                class="iconToolbar"
                :icon="closeCircle"
              />
                </ion-button>

            </ion-item>
          </ion-list>
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
import { defineComponent } from "vue";
//import axios from "axios";
import { arrowBackCircle, addCircle, save, closeCircle } from "ionicons/icons";
import {
  IonItem,
  IonList,
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
  IonSearchbar,
} from "@ionic/vue";

export default defineComponent({
  name: "ModalConfig",
  components: {
    IonItem,
    IonList,
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
    IonSearchbar,
  },
  data() {
    return {
      arrowBackCircle,
      addCircle,
      save,
      closeCircle,
      nomeObj: null,
      
    };
  },
  methods: {
    confirm() {
      return modalController.dismiss(null, "confirm");
    },
    salvarAlteracaoConfig(){
        
    },
  },
  props: {
    nomePg: null,
    listaObj: null,
    labelInpConfig: null,
  },
});
</script>

<style scoped>
ion-item{
  --padding-start: 0px !important;
  --inner-padding-end: 0px !important;

}
ion-list ion-input{
  color: black !important;
  background-color: #e7edf3 !important;
  font-size: 18px !important;
  padding-inline-start: 5px !important;
}
#infoTituloEditar{
  font-size: 18px !important;
  color: darkslategrey;
}
#titleConfig {
  color: darkslategray;
  font-size: 20px !important;
  font-weight: bold;
}
.borderModalView ion-icon {
  font-size: 30px;
}
</style>