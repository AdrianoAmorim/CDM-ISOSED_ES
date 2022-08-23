
<template>
  <ion-header>
    <ion-toolbar>
      <ion-title>Visualizar</ion-title>
      <ion-buttons slot="end">
        <ion-button @click="confirm">OK</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <ion-item>
      <ion-label>id: {{idMembro}}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Nome: {{membro.nome}}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Endereço: {{membro.logradouro.endereco}}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Nº: {{membro.logradouro.numero}}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Bairro: {{membro.logradouro.bairro}}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Cidade: {{membro.logradouro.cidade}}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Telefone: {{membro.telefone}}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Cargo: {{membro.cargo.nome}}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Pai: {{membro.pai}}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Mãe: {{membro.mae}}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Dt Nascimento: {{membro.dtNascimento}}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Dt Batismo: {{membro.dtBatismo}}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>Est. Civil: {{membro.estCivil}}</ion-label>
    </ion-item>
  </ion-content>
</template>

<script>
  import {
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
    modalController,
  } from '@ionic/vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'ModalViewMembro',
    components: { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonButton, IonItem, IonLabel },
    methods: {
      confirm() {
        return modalController.dismiss(null, 'confirm');
      },
    },
    props:{
      idMembro: null,
      membro: null
    }
  });
</script>
<style scoped>

</style>