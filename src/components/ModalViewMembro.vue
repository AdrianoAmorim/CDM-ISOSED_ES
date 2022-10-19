
<template>
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Visualizar</ion-title>

      <ion-button @click="confirm()" color="success" slot="end" fill="clear">
        <ion-icon
          slot="icon-only"
          class="iconToolbar"
          :icon="arrowBackCircle"
        />
      </ion-button>
    </ion-toolbar>
  </ion-header>

  <ion-content>
    <ion-grid>
      <ion-row
        style="margin-bottom: 5px"
        class="borderModalView ion-justify-content-start ion-align-items-center">
        <ion-col size="3">
          <ion-avatar class="avatarFoto avatarViewMembro">
            <ion-img
              :class="membro.url_foto ? '' : 'fotoMembro'"
              :src="membro.url_foto ? membro.url_foto : '/img/camera.png'"
              alt="Avatar do Membro"
            />
          </ion-avatar>
        </ion-col>

        <ion-col size="9">
          <ion-row class="ion-justify-content-start ion-align-items-center">
            <ion-col size="12">
              <span>Nome:</span>
            </ion-col>

            <ion-col size="12">
              <ion-label id="lblNome">{{ membro.nome }}</ion-label>
            </ion-col>
          </ion-row>

          <ion-row class="ion-justify-content-start ion-align-items-center">
            <ion-col size="7">
              <span>Telefone:</span>
            </ion-col>
            <ion-col size="5">
              <span>Cargo:</span>
            </ion-col>
            <ion-col size="7">
              <ion-label id="lblTel">{{ membro.telefone}}</ion-label>
            </ion-col>
            <ion-col size="5">
              <ion-label id="lblCargo">{{ membro.cargo.nome }}</ion-label>
            </ion-col>
          </ion-row>
        </ion-col>
      </ion-row>

      <ion-row
        class="
          borderModalView
          ion-justify-content-start ion-align-items-center
        "
      >
        <ion-col size="12">
          <span>Endereço:</span>
        </ion-col>
        <ion-col size="12">
          <ion-label>{{ membro.logradouro.endereco }}</ion-label>
        </ion-col>
        <ion-col size="2">
          <span>Nº:</span>
        </ion-col>
        <ion-col size="5">
          <span>Bairro:</span>
        </ion-col>
        <ion-col size="5">
          <span>Cidade:</span>
        </ion-col>
        <ion-col size="2">
          <ion-label>{{ membro.logradouro.numero }}</ion-label>
        </ion-col>
        <ion-col size="5">
          <ion-label>{{ membro.logradouro.bairro }}</ion-label>
        </ion-col>
        <ion-col size="5">
          <ion-label>{{ membro.logradouro.cidade }}</ion-label>
        </ion-col>
        <ion-col size="12">
          <span>Pai:</span>
        </ion-col>
        <ion-col size="12">
          <ion-label>{{ membro.pai }}</ion-label>
        </ion-col>
        <ion-col size="12">
          <span>Mâe:</span>
        </ion-col>
        <ion-col size="12">
          <ion-label>{{ membro.mae }}</ion-label>
        </ion-col>
        <ion-col size="6">
          <span>Dt Nascimento:</span>
        </ion-col>
        <ion-col size="6">
          <span>Dt Batismo:</span>
        </ion-col>
        <ion-col size="6">
          <ion-label>{{ membro.dtNascimento.substring(0, 10) }}</ion-label>
        </ion-col>
        <ion-col size="6">
          <ion-label>{{ membro.dtBatismo.substring(0, 10) }}</ion-label>
        </ion-col>
          <ion-col size="6">
          <span>Est. Civil:</span>
        </ion-col>
        <ion-col size="6">
          <span>Congregação:</span>
        </ion-col>
        <ion-col size="6">
          <ion-label>{{ membro.estCivil }}</ion-label>
        </ion-col>
        <ion-col size="6">
          <ion-label>{{ membro.congregacao.nome }}</ion-label>
        </ion-col>
        

      </ion-row>
    </ion-grid>
  </ion-content>
</template>

<script>
import {
  IonGrid,
  IonIcon,
  IonRow,
  IonCol,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonAvatar,
  IonImg,
  IonButton,
  IonLabel,
  modalController,
} from "@ionic/vue";
import { defineComponent } from "vue";
import { arrowBackCircle } from "ionicons/icons";
export default defineComponent({
  name: "ModalViewMembro",
  data() {
    return {
      arrowBackCircle,
    };
  },
  components: {
    IonGrid,
    IonIcon,
    IonRow,
    IonCol,
    IonContent,
    IonHeader,
    IonTitle,
    IonAvatar,
    IonImg,
    IonToolbar,
    IonButton,
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