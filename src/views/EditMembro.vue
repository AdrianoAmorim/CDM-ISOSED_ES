<template>
  <ion-page>
    <InfoMembro :page="nomePg" :cargosLs="this.cargos" :congregacoesLs="this.congregacoes" :membroEd="this.membro" />
  </ion-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { IonPage,alertController } from "@ionic/vue";
import InfoMembro from "@/components/InfoMembro.vue";

export default defineComponent({
  name: "EditMembro",
  components: {
    IonPage,
    InfoMembro,
  },
  data() {
    return {
      urlServer: "https://isosedes.loca.lt",
      nomePg: "editar",
      membro: null,
      cargos: null,
      congregacoes: null
    };
  },
  props: {
    id: String,
  },
  methods:{
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
    async getMembro(idMembro) {
      this.getCargos();
      this.getCongregacoes();
      const auth = sessionStorage.getItem("token")
      try{
        const response = await axios.get(`${this.urlServer}/membro/${idMembro}`,{
               headers: {
            Authorization: `token ${auth}`,
          },
        } );
        if(response.data.id >0){
        this.membro = response.data;
        }else if(response.data.id == 0){
           this.alertInfoSistema("AVISO",'',"Não Conseguimos Encontrar o Membro Selecionado para Editar!! ");
         
        }else if(response.data.error ==true){
          this.alertInfoSistema("ERROR",'',"Houve Um erro Ao Buscar o Membro selecionado para Edição!!  " + response.data.msg);
           this.$router.push("/login");
        }

      }
      catch(e){
          this.alertInfoSistema("ERROR",'',"Houve Um erro Ao Buscar o Membro selecionado para Edição!!  " +e.message);
      }
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
      const auth = sessionStorage.getItem("token")
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
            }else if(response.data.error == true){
              this.alertInfoSistema("ERROR",'',"Error Interno no Servidor: "+ response.data.msg)
               this.$router.push("/login");
            }
            }
          catch(e){
               this.alertInfoSistema("ERROR",'',"Houve Um erro ao Carrega os Cargos!! "+ e.message);
          }
    }
  },
  beforeMount(){
    this.getMembro(this.id);
  }
});
</script>

<style>
</style>