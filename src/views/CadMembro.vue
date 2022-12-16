<template>
  <ion-page>
    <InfoMembro :cargosLs="this.cargos" :congregacoesLs="this.congregacoes" :page="nomePg" />
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
      //urlServer:"http://54.207.193.202:4041",
      urlServer:"http://192.168.18.4:4041",
      nomePg: "cadastro",
      cargos: null,
      congregacoes: null
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
       async getCongregacoes() {
        const auth = sessionStorage.getItem("token")
        try{
          const response = await axios.get(`${this.urlServer}/congregacoes`,{
              headers: {
            Authorization: `token ${auth}`,
          },
          });
            if(response.data.length > 0){
              this.congregacoes = response.data;
            }else if(response.data.length == 0){
            this.alertInfoSistema("AVISO",'',"Nenhuma Congregação Cadastrada!")
            }else if(response.data.error == true){
              this.alertInfoSistema("ERROR",'',"Error Interno no Servidor: "+ response.data.msg)
            this.$router.push("/login");
            }
            }
          catch(e){
             this.alertInfoSistema("ERROR",'',"Houve Um erro ao Carrega as Congregações!! "+ e.message);
          }
    },
    async getCargos() {
      const auth = sessionStorage.getItem("token");
      try{
      const response = await axios.get(`${this.urlServer}/cargos`,{
          headers: {
            Authorization: `token ${auth}`,
          },
      });
        if(response.data.length > 0){
          this.cargos = response.data;
        }else if(response.data.length == 0){
          this.alertInfoSistema("AVISO",'',"Nenhum Cargo Cadastrado!")
        }else if(response.data.error ==true){
           this.alertInfoSistema("ERROR",'',"Error Interno no Servidor: "+ response.data.msg)
          this.$router.push("/login");
        }
        }
      catch(e){
         this.alertInfoSistema("ERROR",'',"Houve Um erro ao Carrega os Cargos!! "+ e.message);
      }
    }
  },
  beforeMount() {
    this.getCargos();
    this.getCongregacoes();
  },
});
</script>

<style>
</style>