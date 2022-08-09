<template>
  <ion-page>
    <InfoMembro :cargosLs="this.cargos" :page="nomePg" />
  </ion-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import { IonPage } from "@ionic/vue";
import InfoMembro from "@/components/InfoMembro.vue";

export default defineComponent({
  name: "CadMembro",
  data() {
    return {
      urlServer:"http://192.168.18.4:4041",
      nomePg: "cadastro",
      cargos: null,
    };
  },
  components: {
    IonPage,
    InfoMembro,
  },
  methods: {
    async getCargos() {
      try{
      const response = await axios.get(`${this.urlServer}/cargos`);
        if(response.data.length > 0){
          this.cargos = response.data;
        }else if(response.data.length == 0){
          alert("Nenhum Cargo Cadastrado!")
        }else if(response.data.error ==true){
          alert("Erro Interno no Servidor: "+ response.data.msg)
        }
        }
      catch(e){
          alert("Houve Um erro ao Carrega os Cargos!! "+ e.message)
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