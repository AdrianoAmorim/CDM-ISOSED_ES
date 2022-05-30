<template>
  <ion-page> 
      <InfoMembro :cargosLs="this.cargos"  :page="nomePg" />
  </ion-page>
</template>

<script>
import axios from "axios";
import { defineComponent } from "vue";
import {
  IonPage,
} from "@ionic/vue";
import InfoMembro from "@/components/InfoMembro.vue";

export default defineComponent({
  name: "CadMembro",
  data() {
    return {
      nomePg: "cadastro",
      cargos:null
    };
  },
   components: {
    IonPage,
    InfoMembro,
  },
  methods:{
            async getCargos() {
      const response = await axios.post(
        "https://cdm-isosed.hasura.app/v1/graphql",
        {
          query: "query getCargos {cargo {id,nome}}",
        },
        {
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret":
              "HqDOmCJCXSI1ITFKPRVp4bwtis0FKbh0aJQxkrR6ZSCKala8GLITbR79brjAA3LM",
          },
        }
      );
      this.cargos = response.data.data.cargo;
    }
  },
  beforeMount(){
    this.getCargos();
  }
});
</script>

<style>
</style>