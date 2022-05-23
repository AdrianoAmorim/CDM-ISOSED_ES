<template>
  <ion-page>
      <InfoMembro titlePage="EDITAR MEMBRO" :page="nomePg" :idMembro="this.id" />
  </ion-page>
</template>

<script>
import { defineComponent } from "vue";
import {IonPage} from "@ionic/vue";
import InfoMembro from "@/components/InfoMembro.vue";

export default defineComponent({
  name: "CadMembro",
  data() {
    return {
     nomePg: "editar"
    };
  },
  props:{
    id:String 
  },
 
  components: {
    IonPage,
    InfoMembro
  },
});
</script>

<style>
</style>