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
      const response = await axios.get("http://localhost:4041/Cargos");
      this.cargos = response.data;
      console.log(response.data)
      },
  },
  beforeMount() {
    this.getCargos();
  },
});
</script>

<style>
</style>