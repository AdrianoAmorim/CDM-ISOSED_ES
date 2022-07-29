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
      urlServer:"http://192.168.15.18:4041",
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
      const response = await axios.get(`${this.urlServer}/cargos`);
      this.cargos = response.data;
      }
  },
  beforeMount() {
    this.getCargos();
  },
});
</script>

<style>
</style>