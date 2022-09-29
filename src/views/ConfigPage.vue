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
import axios from "axios";
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
      //urlServer: "http://192.168.18.4:4041",
      arrowBackCircle,
      create,
      business,
      ribbon,
      listaObj: null,
      labelInpConfig:null
    };
  },
  methods: {
    //ABRIR O MODAL.. PARA EXIBIR OS DADOS DO MEMBRO SELECIONADO
   /* async openModal(nomePg) {
      var returnLista = null;
      
      if (nomePg == "CONGREGAÇÕES") {
        returnLista = await this.getCongregacoes();
        this.labelInpConfig = "Congregação:"

      } else if (nomePg == "CARGOS") {
        returnLista = await this.getCargos();
        this.labelInpConfig = "Cargo:"
      }
      if (returnLista != null) {
        const modal = await modalController.create({
          component: ModalConfig,
          componentProps: { nomePg: nomePg, listaObj: returnLista,labelInpConfig: this.labelInpConfig },
          cssClass: "modalView",
        });
        modal.present();
        const { role } = await modal.onWillDismiss();
        if (role === "confirm") {
          console.log("fechou");
        }
      }
    },*/

    async getCongregacoes() {
      try {
        const response = await axios.get(`${this.urlServer}/congregacoes`);
        if (response.data.length > 0) {
          return response.data;
        } else if (response.data.length == 0) {
          alert("Nenhum Cargo Cadastrado!");
          return null;
        } else if (response.data.error == true) {
          alert("Erro Interno no Servidor: " + response.data.msg);
          return null;
        }
      } catch (e) {
        alert("Houve Um erro ao Carrega os Cargos!! " + e.message);
      }
    },
    async getCargos() {
        try{
          const response = await axios.get(`${this.urlServer}/cargos`);
            if(response.data.length > 0){
              return response.data;
            }else if(response.data.length == 0){
              alert("Nenhum Cargo Cadastrado!")
              return null
            }else if(response.data.error == true){
              alert("Erro Interno no Servidor: "+ response.data.msg)
              return null
            }
            }
          catch(e){
              alert("Houve Um erro ao Carrega os Cargos!! "+ e.message)
          }
    }
  },
});
</script>

<style>
</style>