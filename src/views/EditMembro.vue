<template>
  <ion-page>
    <InfoMembro :page="nomePg" :cargosLs="this.cargos" :membroEd="this.membro" />
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
      urlServer:"http://192.168.18.4:4041",
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
      const response = await axios.get(`${this.urlServer}/membro/${idMembro}` );
      this.membro = response.data;
    },
      async getCargos() {
      const response = await axios.get(`${this.urlServer}/cargos`);
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