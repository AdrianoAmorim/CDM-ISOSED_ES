<template>
  <ion-page>
    
 
      <InfoMembro  :page="nomePg" />
    
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {
  IonPage,
} from "@ionic/vue";
import InfoMembro from "@/components/InfoMembro.vue";

export default defineComponent({
  name: "CadMembro",
  data() {
    return {
      nomePg: "cadastro"
    };
  },
   components: {
    IonPage,
    InfoMembro,
  },
});
</script>

<style>
</style>