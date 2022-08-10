<template>
  <ion-page>
    <InfoMembro :cargosLs="this.cargos" :page="nomePg" />
  </ion-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { IonPage,alertController } from "@ionic/vue";
import InfoMembro from "@/components/InfoMembro.vue";

export default defineComponent({
  name: "CadMembro",
  data() {
    return {
      urlServer:"http://192.168.0.37:4041",
      nomePg: "cadastro",
      cargos: null,
    };
  },
  components: {
    IonPage,
    InfoMembro,
  },
  methods: {
      async alertInfoSistema(header,subHeader,message) {
      const alert = await alertController.create({
        cssClass: "alert-info",
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: ["OK"],
      });
       await alert.present();
    },
    async getCargos() {
      try{
      const response = await axios.get(`${this.urlServer}/cargos`);
        if(response.data.length > 0){
          this.cargos = response.data;
        }else if(response.data.length == 0){
          this.alertInfoSistema("AVISO",'',"Nenhum Cargo Cadastrado!")
        }else if(response.data.error ==true){
           this.alertInfoSistema("ERROR",'',"Error Interno no Servidor: "+ response.data.msg)
        }
        }
      catch(e){
         this.alertInfoSistema("ERROR",'',"Houve Um erro ao Carrega os Cargos!! "+ e.message);
      }
    }
  },
  beforeMount() {
    this.getCargos();
  },
});
</script>

<style>
</style>