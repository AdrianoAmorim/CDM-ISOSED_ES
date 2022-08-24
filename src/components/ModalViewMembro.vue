
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
    <ion-avatar class="avatarFoto">
      <ion-img
        :class="membro.url_foto ? '' : 'fotoMembro'"
        :src="membro.url_foto ? membro.url_foto : '/img/camera.png'"
        alt="Avatar do Membro"/>
    </ion-avatar>

       <ion-item>
      <ion-label><span>Nome:</span> {{ membro.nome }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label
        ><span>Endereço:</span> {{ membro.logradouro.endereco }}</ion-label
      >
    </ion-item>
    <ion-item>
      <ion-label><span>Nº:</span> {{ membro.logradouro.numero }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label><span>Bairro:</span> {{ membro.logradouro.bairro }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label><span>Cidade:</span> {{ membro.logradouro.cidade }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label><span>Telefone:</span> {{ membro.telefone }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label><span>Cargo:</span> {{ membro.cargo.nome }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label><span>Pai:</span> {{ membro.pai }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label><span>Mãe:</span> {{ membro.mae }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label
        ><span>Dt Nascimento:</span>
        {{ membro.dtNascimento.substring(0, 10) }}</ion-label
      >
    </ion-item>
    <ion-item>
      <ion-label
        ><span>Dt Batismo:</span>
        {{ membro.dtBatismo.substring(0, 10) }}</ion-label
      >
    </ion-item>
    <ion-item>
      <ion-label><span>Est. Civil:</span> {{ membro.estCivil }}</ion-label>
    </ion-item>
  </ion-content>
</template>

<script>
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonImg,
  IonButtons,
  IonButton,
  IonItem,
  IonLabel,
  modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ModalViewMembro",
  components: {
    IonContent,
    IonHeader,
    IonTitle,
    IonAvatar,
    IonImg,
    IonToolbar,
    IonButtons,
    IonButton,
    IonItem,
    IonLabel,
  },
  methods: {
    confirm() {
      return modalController.dismiss(null, "confirm");
    },
  },
  props: {
    idMembro: null,
    membro: null,
  },
});
</script>