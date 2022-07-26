<template>
  <ion-toolbar color="primary">
    <ion-thumbnail slot="start">
      <ion-img  :src="imgLogo" alt="logomarca" />
    </ion-thumbnail>

    <ion-title>CDM - ISOSED ES</ion-title>
  </ion-toolbar>
</template>

<script>
import { defineComponent } from "vue";
import { IonToolbar, IonTitle, IonImg, IonThumbnail } from "@ionic/vue";

export default defineComponent({
  name: "nav-bar",
  components: {
    IonToolbar,
    IonTitle,
    IonImg,
    IonThumbnail,
  },
  data() {
    return {
      imgLogo: "/img/logo.png",
    };
  },
});
</script>

<style scoped>
ion-thumbnail {
  --size: 50px;
  margin: 10px;
}
ion-thumbnail ion-img{
  object-fit: contain;
}
ion-title {
  overflow:visible;
  padding: 5px;
}
</style>