<template>
  <ion-page>
    <InfoMembro :page="nomePg" :cargosLs="this.cargos" :congregacoesLs="this.congregacoes" :membroEd="this.membro" />
  </ion-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { IonPage } from "@ionic/vue";
import InfoMembro from "@/components/InfoMembro.vue";

export default defineComponent({
  name: "EditMembro",
  components: {
    IonPage,
    InfoMembro,
  },
  data() {
    return {
      urlServer: "https://isosed-server.herokuapp.com",
      //urlServer:"http://192.168.18.4:4041",
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
    async getMembro(idMembro) {
      this.getCargos();
      this.getCongregacoes();
      try{
        const response = await axios.get(`${this.urlServer}/membro/${idMembro}` );
        if(response.data.id >0){
        this.membro = response.data;
        }else if(response.data.id == 0){
          alert("Não Conseguimos Encontrar o Membro Selecionado para Editar!!")
        }else if(response.data.error ==true){
          alert("Erro interno no Servidor: " + response.data.msg)
        }

      }
      catch(e){
          alert("Houve Um erro Ao Buscar o Membro selecionado para Edição!! " + e.message)
      }
    },
     async getCongregacoes() {
        try{
          const response = await axios.get(`${this.urlServer}/congregacoes`);
            if(response.data.length > 0){
              this.congregacoes = response.data;
            }else if(response.data.length == 0){
              alert("Nenhum Cargo Cadastrado!")
            }else if(response.data.error == true){
              alert("Erro Interno no Servidor: "+ response.data.msg)
            }
            }
          catch(e){
              alert("Houve Um erro ao Carrega os Cargos!! "+ e.message)
          }
    },
    async getCargos() {
        try{
          const response = await axios.get(`${this.urlServer}/cargos`);
            if(response.data.length > 0){
              this.cargos = response.data;
            }else if(response.data.length == 0){
              alert("Nenhum Cargo Cadastrado!")
            }else if(response.data.error == true){
              alert("Erro Interno no Servidor: "+ response.data.msg)
            }
            }
          catch(e){
              alert("Houve Um erro ao Carrega os Cargos!! "+ e.message)
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