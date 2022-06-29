<template>
  <ion-page>
    <InfoMembro :idMembro="id" :page="nomePg" :cargosLs="this.cargos" :membroEd="this.membro" />
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
      nomePg: "editar",
      membro: null,
      cargos: null
    };
  },
  props: {
    id: String,
  },
  methods:{
    async getMembro(idMembro) {
      const response = await axios.get(`http://localhost:4041/membro/${idMembro}` );
     
      this.membro = response.data;
    },
      async getCargos() {
      const response = await axios.get("http://localhost:4041/cargos");
      this.cargos = response.data;
      }
  },
  beforeMount(){
    this.getMembro(this.id);
    this.getCargos();
  }
});
</script>

<style>
</style>