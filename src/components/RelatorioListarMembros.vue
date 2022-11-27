<template>
  <ion-list v-show="showList" mode="ios">
    <ion-list-header >
      <ion-label>{{tituloListar}}</ion-label>
    </ion-list-header>
    <ion-item class="bordaList" v-for="Membro in listaMembros" :key="Membro.id">
      <ion-label>{{Membro.nome}}</ion-label>
      <ion-label slot="end" class="textListCgr">{{Membro.congregacao.nome}}</ion-label>
    </ion-item>
  </ion-list>
</template>

<script>
import { defineComponent } from "vue";
import { IonList, IonItem, IonLabel, IonListHeader } from "@ionic/vue";
export default defineComponent({
  name: "RelatorioListarMembros",
  components: {
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
  },
  props: {
    showList: Boolean,
    listaMembros: Array,
    tituloListar: String
  },
});
</script>

<style scoped>
.textListCgr {
  color: #eb445a;
}
.bordaList {
  --inner-border-width: 0px;
  --border-width: 0 0 0.5px 0;
  --border-color: #3289c7;
}
ion-item {
  --inner-padding-end: 5px;
  --padding-start: 15px;
}
ion-list ion-item ion-label {
  overflow: visible !important;
  font-weight: bold;
}

ion-list-header {
  --background: linear-gradient(110deg, #3a6b8e 30%, #3289c7 45%);
  --color: #fff;
  align-items: center;
  letter-spacing: 1px;
  text-align: center;
  padding-inline-start: 0;
}
ion-list-header ion-label {
  margin: 10px 0 !important;
}
</style>
